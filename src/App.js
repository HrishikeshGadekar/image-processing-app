import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import Controls from './components/Controls';
import ImagePreview from './components/ImagePreview';
import CroppingTool from './components/CroppingTool';
import './styles/App.css';

function App() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(400);
  const [showCropper, setShowCropper] = useState(false);

  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
    const formData = new FormData();
    formData.append('image', file);

    // Send image to the backend to get initial preview
    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setPreviewUrl(data.previewUrl);
  };

  const handleSliderChange = async (e, type) => {
    const value = e.target.value;
    let updatedState = {};

    switch (type) {
      case 'brightness':
        setBrightness(value);
        updatedState = { brightness: value };
        break;
      case 'contrast':
        setContrast(value);
        updatedState = { contrast: value };
        break;
      case 'saturation':
        setSaturation(value);
        updatedState = { saturation: value };
        break;
      case 'rotation':
        setRotation(value);
        updatedState = { rotation: value };
        break;
      case 'width':
        setWidth(value);
        updatedState = { width: value };
        break;
      case 'height':
        setHeight(value);
        updatedState = { height: value };
        break;
      default:
        break;
    }

    // Send the updated control values to the backend
    const response = await fetch('http://localhost:5000/adjust', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: image.name,
        ...updatedState,
      }),
    });

    const data = await response.json();
    setPreviewUrl(data.previewUrl); // Update preview with backend result
  };

  const handleCrop = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    // Send cropped image to the backend
    const response = await fetch('http://localhost:5000/crop', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setPreviewUrl(data.previewUrl); // Update preview with cropped image
    setShowCropper(false);
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
          <button onClick={() => setShowCropper(true)}>Open Cropper</button>
          {showCropper && (
            <CroppingTool
              imageUrl={previewUrl}
              onCrop={handleCrop}
            />
          )}
          <ImagePreview
            previewUrl={previewUrl}
            brightness={brightness}
            contrast={contrast}
            saturation={saturation}
            rotation={rotation}
            width={width}
            height={height}
          />
        </>
      )}
    </div>
  );
}

export default App;
