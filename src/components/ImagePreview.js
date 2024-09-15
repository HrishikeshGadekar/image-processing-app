import React from "react";
import "../styles/ImagePreview.css";

const ImagePreview = ({
  previewUrl,
  brightness,
  contrast,
  saturation,
  rotation,
}) => {
  return (
    <div className="preview-section">
      <h3>Preview</h3>
      {previewUrl && (
        <img
          src={previewUrl}
          alt="preview"
          style={{
            filter: `brightness(${brightness}) contrast(${contrast}) saturate(${saturation})`,
            transform: `rotate(${rotation}deg)`,
          }}
        />
      )}
    </div>
  );
};

export default ImagePreview;
