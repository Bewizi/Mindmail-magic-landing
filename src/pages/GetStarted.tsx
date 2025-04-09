import { useState } from "react";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
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
import { Send, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

import httpClient from "@/utils/httpClient";

interface Message {
  id: string;
  content: string;
  sender: "user" | "universe";
  timestamp: Date;
}

const GetStarted = () => {
  const [inputValue, setInputValue] = useState("");
  const [prompt, setPrompt] = useState(""); // input value
  const [imageUrl, setImageUrl] = useState<string | null>(null); // for showing the generated image
  const [loading, setLoading] = useState(false); // for loading state

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleImageGeneration = async () => {
    if (!prompt) return;

    setLoading(true);

    try {
      const response = await httpClient.post(
        "/generate-image",
        { prompt } // send {prompt: "your text"}
      );

      console.log(response.data); // See what you get back

      // Assuming the API sends back { imageUrl: "http://..." }
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="min-h-screen bg-background text-foreground flex flex-col ">
      <NavBar />
      <main className="flex-grow pt-24 pb-16 px-4 md:px-6">
        <div>
          <h1 className="text-4xl font-bold text-center mb-8">Get Started</h1>
          <p className="text-lg text-center mb-4">
            Ready to unlock the universe's secrets? Let's get started!
          </p>
          <div className="flex flex-col items-center p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Generate AI Image</CardTitle>
                <CardDescription>
                  Type a prompt and get an AI image!
                </CardDescription>
              </CardHeader>

              <CardContent>
                {prompt && (
                  <p className="text-lg text-center font-semibold">{prompt}</p>
                )}
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Generated AI Art"
                    className="rounded-lg shadow-md max-w-full h-auto"
                  />
                )}
                <div className="border-t border-white/10 p-4 mt-auto">
                  <div className="flex space-x-2">
                    <Input
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Enter your prompt"
                      className="bg-white/5 border-white/10 text-white"
                    />
                    <Button
                      onClick={handleImageGeneration}
                      disabled={loading}
                      className="cosmic-button"
                    >
                      {loading ? "Gen.." : <Send size={18} />}
                    </Button>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button onClick={handleImageGeneration} disabled={loading}>
                  {loading ? "Generating..." : "Generate Image"}
                </Button>
              </CardFooter>
            </Card>

            {imageUrl && (
              <div className="mt-4">
                <img
                  src={imageUrl}
                  alt="Generated"
                  className="rounded shadow-md"
                />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </section>
  );
};

export default GetStarted;
