import React, { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "../styles/ImageCropper.css";

function ImageCropper({ imageUrl, onCrop, onClose }) {
  const cropperRef = useRef(null);

  const handleCrop = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      onCrop(cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div className="cropper-container">
      <Cropper
        src={imageUrl}
        style={{ height: 400, width: "100%" }}
        initialAspectRatio={1}
        guides={false}
        ref={cropperRef}
      />
      <button onClick={handleCrop}>Crop</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default ImageCropper;
