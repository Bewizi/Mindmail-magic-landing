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
import { Send, Upload, Loader, AlertCircle } from "lucide-react";
import { httpClient } from "@/utils/httpClient";

const ImageTool = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [explanation, setExplanation] = useState("");
  const fileInputRef = useRef(null);

  // Handle keyboard submission with Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading && prompt.trim()) {
      handleActionButtonClick();
    }
  };

  // Generate image from text prompt
  const handleImageGeneration = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await httpClient.post("/generate-image", { prompt });

      if (response.data && response.data.imageUrl) {
        setImageUrl(response.data.imageUrl);
        // Clear uploaded image data
        setUploadedImage(null);
        setUploadedFile(null);
        setExplanation("");
      } else {
        throw new Error("No image URL in response");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      setError("Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (JPEG, PNG, etc.)");
      return;
    }

    // Store the actual file for upload
    setUploadedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
      setImageUrl(null); // Clear any generated image
      setError("");
      setExplanation("");
    };
    reader.onerror = () => {
      setError("Failed to read the image file");
    };
    reader.readAsDataURL(file);
  };

  // Explain uploaded image
  const handleExplainImage = async () => {
    if (!uploadedFile || !prompt.trim()) {
      setError("Please upload an image and enter a prompt");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Create FormData for multipart/form-data submission
      const formData = new FormData();
      formData.append("image", uploadedFile);
      formData.append("prompt", prompt);

      const response = await httpClient.post("/edit-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("API Response:", response.data);

      // Handle the response based on what the API returns
      if (
        response.data &&
        (response.data.explanation || response.data.description)
      ) {
        setExplanation(response.data.explanation || response.data.description);
      } else if (typeof response.data === "string") {
        setExplanation(response.data);
      } else {
        setExplanation("Image analyzed successfully");
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      setError("Failed to analyze the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle the action button click based on context
  const handleActionButtonClick = () => {
    if (uploadedImage) {
      handleExplainImage();
    } else {
      handleImageGeneration();
    }
  };

  // Reset the form
  const handleReset = () => {
    setUploadedImage(null);
    setUploadedFile(null);
    setImageUrl(null);
    setPrompt("");
    setExplanation("");
    setError("");
  };

  // Determine the current mode based on state
  const isUploadMode = !!uploadedImage;
  const isResultsVisible = isUploadMode ? !!explanation : !!imageUrl;

  return (
    <div className="flex flex-col items-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>AI Image Tool</CardTitle>
          <CardDescription>
            Generate images from text or analyze uploaded images
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Display Area */}
          <div className="min-h-48 flex flex-col items-center justify-center">
            {loading ? (
              <div className="flex flex-col items-center">
                <Loader className="animate-spin h-10 w-10 text-primary" />
                <p className="mt-2">
                  {isUploadMode ? "Analyzing image..." : "Generating image..."}
                </p>
              </div>
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt="Generated AI Art"
                className="rounded-lg shadow-md max-w-full h-auto"
              />
            ) : uploadedImage ? (
              <div className="space-y-2 w-full">
                <img
                  src={uploadedImage}
                  alt="Uploaded Image"
                  className="rounded-lg shadow-md max-w-full h-auto mx-auto"
                />
                {explanation && (
                  <div className="mt-4 p-4 bg-slate-100 rounded-md text-slate-800">
                    <h3 className="font-medium mb-1">Analysis Result:</h3>
                    <p>{explanation}</p>
                  </div>
                )}
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => fileInputRef.current.click()}
              >
                <Upload className="mx-auto h-8 w-8 text-slate-400" />
                <p className="mt-2 text-sm text-slate-600">
                  Click to upload an image or enter a prompt below
                </p>
                <p className="text-xs text-slate-500">
                  JPEG, PNG, JPG supported
                </p>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />

          {/* Upload Button */}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => fileInputRef.current.click()}
          >
            <Upload className="mr-2 h-4 w-4" /> Upload Image
          </Button>

          {/* Text Input Area */}
          <div className="flex space-x-2">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={
                isUploadMode
                  ? "Describe what you want to know about this image"
                  : "Enter your prompt for image generation"
              }
              className="flex-1"
            />
            <Button
              onClick={handleActionButtonClick}
              disabled={loading || !prompt.trim()}
            >
              {loading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          {isResultsVisible ? (
            <>
              <Button variant="outline" onClick={handleReset} className="w-1/3">
                Reset
              </Button>
              <Button
                onClick={handleActionButtonClick}
                disabled={loading || !prompt.trim()}
                className="w-2/3 ml-2"
              >
                {loading
                  ? "Processing..."
                  : isUploadMode
                  ? "Analyze Image"
                  : "Generate Image"}
              </Button>
            </>
          ) : (
            <Button
              onClick={handleActionButtonClick}
              disabled={loading || !prompt.trim()}
              className="w-full"
            >
              {loading
                ? "Processing..."
                : isUploadMode
                ? "Analyze Image"
                : "Generate Image"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ImageTool;
