import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const CroppingTool = ({ imageUrl, onCrop }) => {
  const [cropper, setCropper] = useState(null);
  const cropperRef = useRef(null);

  const cropImage = () => {
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      croppedCanvas.toBlob((blob) => {
        const file = new File([blob], "cropped-image.png", {
          type: "image/png",
        });
        onCrop(file); // Send cropped image to the backend
      });
    }
  };

  return (
    <div className="cropping-tool">
      <Cropper
        src={imageUrl}
        style={{ height: 400, width: "100%" }}
        aspectRatio={16 / 9}
        guides={false}
        ref={cropperRef}
        onInitialized={(instance) => setCropper(instance)}
      />
      <button onClick={cropImage}>Crop Image</button>
    </div>
  );
};

export default CroppingTool;
