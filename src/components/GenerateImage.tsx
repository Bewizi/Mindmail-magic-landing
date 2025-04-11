import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Upload, Loader, AlertCircle, Plus } from "lucide-react";
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

  // Function to trigger file input click
  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div>
      {/* Right Panel - Image Generation */}
      <div className="bg-gray-900 bg-opacity-60 p-6 rounded-lg border border-gray-800">
        <div className="mb-4">
          <h2 className="text-purple-500 mb-2">Visualize your Manifestation</h2>
          <p className="text-sm text-gray-400">
            Describe the reality you want to manifest, and bring it to life
            visually.
          </p>
        </div>

        <div className="bg-gray-800 bg-opacity-70 p-4 rounded-md mb-4 mr-auto max-w-xs">
          <p className="text-sm">
            Upload a base image and a detailed description of what you want to
            see
          </p>
        </div>

        <div className="bg-purple-600 text-start py-2 px-4 rounded-md ml-auto mb-4 w-[320px]">
          <button className="text-white">
            Generate an image of me in a lambo
          </button>
        </div>

        {/* Display Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center bg-gray-800 bg-opacity-70 p-4 rounded mb-4 min-h-32">
            {/* <p className="mt-2 text-sm text-gray-300">
              {isUploadMode ? "Analyzing image..." : "Generating image..."}
            </p> */}
          </div>
        ) : imageUrl ? (
          <div className=" bg-opacity-70 p-4 rounded mb-4">
            <img
              src={imageUrl}
              alt="Generated AI Art"
              className="rounded max-w-sm h-auto mx-auto object-cover block"
            />
          </div>
        ) : uploadedImage ? (
          <div className="bg-opacity-70 p-4 rounded mb-4">
            <img
              src={uploadedImage}
              alt="Uploaded Image"
              className="rounded max-w-sm h-auto mx-auto object-cover block"
            />
            {explanation && (
              <div className="mt-4 p-3 bg-gray-700 rounded text-gray-200 text-sm">
                <p>{explanation}</p>
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}

        {error && (
          <div className="bg-red-900 bg-opacity-30 text-red-300 p-3 rounded-md text-sm flex items-start mb-4">
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

        <div className="relative mb-4">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Visualize your future. Describe it here...."
            className="pr-12 bg-gray-800 border-gray-700 text-white"
          />
          <Button
            type="button"
            onClick={triggerFileUpload}
            className="absolute right-0 top-0 h-full bg-transparent hover:bg-transparent"
          >
            <Plus className="h-5 w-5 text-purple-500" />
          </Button>
        </div>

        <Button
          onClick={handleActionButtonClick}
          disabled={loading || (!prompt.trim() && !uploadedImage)}
          className="w-full bg-purple-600 hover:bg-purple-700 border-0"
        >
          {loading ? (
            <Loader className="animate-spin h-[50px] w-[50px] text-white" />
          ) : (
            <p>Create My Vision</p>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ImageTool;
