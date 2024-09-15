import React from "react";
import "../styles/Controls.css";

const Controls = ({
  brightness,
  contrast,
  saturation,
  rotation,
  handleSliderChange,
}) => {
  return (
    <div className="controls-container">
      <div className="control-group">
        <label htmlFor="brightness">Brightness:</label>
        <input
          id="brightness"
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={brightness}
          onChange={(e) => handleSliderChange(e, "brightness")}
        />
        <span>{brightness}</span>
      </div>
      <div className="control-group">
        <label htmlFor="contrast">Contrast:</label>
        <input
          id="contrast"
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={contrast}
          onChange={(e) => handleSliderChange(e, "contrast")}
        />
        <span>{contrast}</span>
      </div>
      <div className="control-group">
        <label htmlFor="saturation">Saturation:</label>
        <input
          id="saturation"
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={saturation}
          onChange={(e) => handleSliderChange(e, "saturation")}
        />
        <span>{saturation}</span>
      </div>
      <div className="control-group">
        <label htmlFor="rotation">Rotation:</label>
        <input
          id="rotation"
          type="range"
          min="0"
          max="360"
          step="1"
          value={rotation}
          onChange={(e) => handleSliderChange(e, "rotation")}
        />
        <span>{rotation}°</span>
      </div>
    </div>
  );
};

export default Controls;
