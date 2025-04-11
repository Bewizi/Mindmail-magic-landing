import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader, Volume2, Download, Pause } from "lucide-react";
import { audioClient } from "@/utils/httpClient";

const GenerateAudio = () => {
  const [userInput, setUserInput] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState("");
  const [submittedInput, setSubmittedInput] = useState(""); // To store submitted input
  const [response, setResponse] = useState("");
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
      const response = await audioClient.post("/manifest", { userInput });

      let audioData;
      if (response.data.audioUrl) {
        audioData = response.data.audioUrl;
      } else if (response.data.audio) {
        audioData = `data:audio/mp3;base64,${response.data.audio}`;
      } else if (response.data.url) {
        audioData = response.data.url;
      } else if (
        typeof response.data === "string" &&
        response.data.startsWith("http")
      ) {
        audioData = response.data;
      } else {
        throw new Error("Couldn't find audio data in the response");
      }

      setAudioUrl(audioData);
      setResponse("Audio generated successfully!"); // Store response on success
      setSubmittedInput(userInput); // Store the submitted input
      setUserInput(""); // Clear the input field after submission

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

    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = `audio-${Date.now()}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      {/* Left Panel */}
      <div className="bg-gray-900 bg-opacity-60 p-6 rounded-lg border border-gray-800">
        <div className="mb-4">
          <h2 className="text-purple-500 mb-2">
            Tell the Universe your Intentions
          </h2>
          <p className="text-sm text-gray-400">
            Give voice to your intentions. Listen and align your energy with
            success.
          </p>
        </div>

        <div className="bg-gray-800 bg-opacity-70 p-4 rounded-md mb-4 max-w-sm">
          <p className="text-sm">
            {submittedInput ? (
              <>
                <span className="font-bold"></span> {submittedInput}
              </>
            ) : (
              <span>
                Welcome to MindMelt. Tell us what you would like to manifest
              </span>
            )}
          </p>

          {/* Display the response */}
        </div>

        <div className="mb-4 ml-auto w-[220px]">
          {audioUrl ? (
            <div className="bg-gray-800 bg-opacity-70 p-3 rounded">
              <div className="flex items-center space-x-2">
                <button
                  onClick={togglePlayPause}
                  className="text-purple-500 hover:text-purple-400"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>
                <div className="flex-1 bg-gray-700 h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-500 h-full"
                    style={{ width: "30%" }}
                  ></div>
                </div>
                <button
                  onClick={handleDownload}
                  className="text-purple-500 hover:text-purple-400"
                >
                  <Download className="h-5 w-5" />
                </button>
              </div>
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={handleAudioEnded}
                onLoadedData={handleAudioLoaded}
                onError={handleAudioError}
                className="hidden"
              />
            </div>
          ) : (
            <div className="bg-purple-600 text-start py-2 px-4 ml-auto rounded-md mb-4 w-[220px] ">
              <button className="text-white">I want to get a new job</button>
            </div>
          )}
        </div>

        <div className="relative mb-4">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="What do you want to speak into reality?..."
            className="pr-12 bg-gray-800 border-gray-700 text-white"
          />
          <Button
            onClick={handleAudioGeneration}
            disabled={loading || !userInput.trim()}
            className="absolute right-0 top-0 h-full bg-transparent hover:bg-transparent"
          >
            {loading ? (
              <Loader className="h-5 w-5 text-purple-500 animate-spin" />
            ) : (
              <Send className="h-5 w-5 text-purple-500" />
            )}
          </Button>
        </div>

        {/* {audioUrl && (
          <div className="bg-gray-800 bg-opacity-70 p-3 rounded">
            <div className="flex items-center space-x-2">
              <button
                onClick={togglePlayPause}
                className="text-purple-500 hover:text-purple-400"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </button>
              <div className="flex-1 bg-gray-700 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-purple-500 h-full"
                  style={{ width: "30%" }}
                ></div>
              </div>
              <button
                onClick={handleDownload}
                className="text-purple-500 hover:text-purple-400"
              >
                <Download className="h-5 w-5" />
              </button>
            </div>
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={handleAudioEnded}
              onLoadedData={handleAudioLoaded}
              onError={handleAudioError}
              className="hidden"
            />
          </div>
        )} */}

        {error && (
          <div className="bg-red-900 bg-opacity-30 text-red-300 p-3 rounded-md text-sm mt-2">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateAudio;
