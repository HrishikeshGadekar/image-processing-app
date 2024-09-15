// src/components/ImagePreview.js
import React from "react";
import "../styles/ImagePreview.css";

function ImagePreview({ previewUrl }) {
  return (
    <div className="image-preview-container">
      <h3>Preview</h3>
      {previewUrl ? (
        <img src={previewUrl} alt="Preview" className="image-preview" />
      ) : (
        <p>No preview available</p>
      )}
    </div>
  );
}

export default ImagePreview;
