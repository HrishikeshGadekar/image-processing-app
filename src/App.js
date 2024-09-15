import React, { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import Controls from "./components/Controls";
import ImagePreview from "./components/ImagePreview";
import ImageCropper from "./components/ImageCropper";
import { uploadImage, adjustImage } from "./api/api";
import "./styles/App.css";

function App() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(400);
  const [cropping, setCropping] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);

    try {
      const data = await uploadImage(file);
      setPreviewUrl(data.previewUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSliderChange = async (e, type) => {
    const value = e.target.value;
    let updatedState = {};

    switch (type) {
      case "brightness":
        setBrightness(value);
        updatedState = { brightness: value };
        break;
      case "contrast":
        setContrast(value);
        updatedState = { contrast: value };
        break;
      case "saturation":
        setSaturation(value);
        updatedState = { saturation: value };
        break;
      case "rotation":
        setRotation(value);
        updatedState = { rotation: value };
        break;
      case "width":
        setWidth(value);
        updatedState = { width: value };
        break;
      case "height":
        setHeight(value);
        updatedState = { height: value };
        break;
      default:
        break;
    }

    if (image) {
      try {
        const data = await adjustImage(
          image,
          brightness,
          contrast,
          saturation,
          rotation,
          width,
          height
        );
        setPreviewUrl(data.previewUrl);
      } catch (error) {
        console.error("Error adjusting image:", error);
      }
    }
  };

  const handleCrop = (croppedImageUrl) => {
    setCropping(false);
    setCroppedImage(croppedImageUrl);
    setPreviewUrl(croppedImageUrl); // Optionally update the preview with the cropped image
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = croppedImage || previewUrl;
    link.download = "processed-image.jpg"; // Adjust the filename and extension as needed
    link.click();
  };

  return (
    <div className="app-container">
      <header>
        <h1>Real-Time Image Processor</h1>
      </header>
      <ImageUpload handleDrop={handleDrop} />
      {image && (
        <>
          <Controls
            brightness={brightness}
            contrast={contrast}
            saturation={saturation}
            rotation={rotation}
            width={width}
            height={height}
            handleSliderChange={handleSliderChange}
          />
          {cropping ? (
            <ImageCropper
              imageUrl={previewUrl}
              onCrop={handleCrop}
              onClose={() => setCropping(false)}
            />
          ) : (
            <ImagePreview
              previewUrl={previewUrl}
              brightness={brightness}
              contrast={contrast}
              saturation={saturation}
              rotation={rotation}
              width={width}
              height={height}
            />
          )}
          <button onClick={handleDownload} disabled={!previewUrl}>
            Download
          </button>
          <button onClick={() => setCropping(true)} disabled={!previewUrl}>
            Crop Image
          </button>
        </>
      )}
    </div>
  );
}

export default App;
