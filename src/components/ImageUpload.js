import React from "react";
import Dropzone from "react-dropzone";
import "../styles/ImageUpload.css";

const ImageUpload = ({ handleDrop }) => {
  return (
    <div className="upload-section">
      <h2>Upload your Image (PNG/JPEG)</h2>
      <Dropzone
        onDrop={handleDrop}
        accept={{ "image/png": [], "image/jpeg": [] }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag & drop your image here or click to select one</p>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default ImageUpload;
