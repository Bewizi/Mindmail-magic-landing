import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Send, Loader, Volume2, Download, Pause } from "lucide-react";
import { audioClient } from "@/utils/httpClient";

const GenerateAudio = () => {
  const [userInput, setUserInput] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState("");
  const audioRef = useRef(null);

  // Handle keyboard submission with Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleAudioGeneration();
    }
  };

  // Generate audio from text prompt
  const handleAudioGeneration = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    setError("");

    try {
      // Using the specific endpoint provided
      const response = await audioClient.post("/manifest", { userInput });

      console.log("API Response:", response.data);

      // Handle different possible response formats
      let audioData;
      if (response.data.audioUrl) {
        // If API returns a URL
        audioData = response.data.audioUrl;
      } else if (response.data.audio) {
        // If API returns base64 audio
        audioData = `data:audio/mp3;base64,${response.data.audio}`;
      } else if (response.data.url) {
        // Another possible URL field
        audioData = response.data.url;
      } else if (
        typeof response.data === "string" &&
        response.data.startsWith("http")
      ) {
        // If API returns a direct URL string
        audioData = response.data;
      } else {
        throw new Error("Couldn't find audio data in the response");
      }

      setAudioUrl(audioData);

      // Automatically load the audio once it's available
      if (audioRef.current) {
        audioRef.current.load();
      }
    } catch (error) {
      console.error("Error generating audio:", error);
      setError("Failed to generate audio. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle play/pause audio
  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Error playing audio:", err);
        setError(
          "Failed to play audio. The file may be invalid or still loading."
        );
      });
    }

    setIsPlaying(!isPlaying);
  };

  // Handle audio events
  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleAudioLoaded = () => {
    console.log("Audio loaded successfully");
  };

  const handleAudioError = () => {
    setError("Error loading audio. The URL may be invalid or inaccessible.");
  };

  // Download the generated audio
  const handleDownload = () => {
    if (!audioUrl) return;

    // Create a temporary anchor element for downloading
    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = `audio-${Date.now()}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>AI Audio Generator</CardTitle>
          <CardDescription>Convert text to speech with AI</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Audio Player */}
          {audioUrl && (
            <div className="bg-slate-100 p-4 rounded-lg">
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={handleAudioEnded}
                onLoadedData={handleAudioLoaded}
                onError={handleAudioError}
                className="w-full"
                controls
              />
              <div className="flex justify-center space-x-2 mt-3">
                <Button variant="outline" size="sm" onClick={togglePlayPause}>
                  {isPlaying ? (
                    <Pause className="h-4 w-4 mr-2" />
                  ) : (
                    <Volume2 className="h-4 w-4 mr-2" />
                  )}
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Display the current prompt */}
          {audioUrl && (
            <div className="bg-slate-50 p-3 rounded-md text-[#1e1e1e]">
              <p className="text-sm font-medium">Generated from:</p>
              <p className="italic">"{userInput}"</p>
            </div>
          )}

          {/* Text Input Area */}
          <div className="flex space-x-2">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter text to convert to speech"
              className="flex-1"
            />
            <Button
              onClick={handleAudioGeneration}
              disabled={loading || !userInput.trim()}
            >
              {loading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleAudioGeneration}
            disabled={loading || !userInput.trim()}
            className="w-full"
          >
            {loading ? "Generating..." : "Generate Audio"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GenerateAudio;
