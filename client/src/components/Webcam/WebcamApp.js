import React, { useState } from "react";
import RecognitionHook from "./RecognitionHook";

function WebcamAppHand() {
  const [selectedColor, setSelectedColor] = useState("#FF3030"); // Default color

  const { videoElement, maxVideoWidth, maxVideoHeight, canvasEl } =
    RecognitionHook(selectedColor);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const colors = [
    { name: "Red", color: "#FF3030" },
    { name: "Blue", color: "#007bff" },
    { name: "Green", color: "#28a745" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.videoContainer}>
        <video
          className="video"
          playsInline
          ref={videoElement}
          style={styles.video}
        />
        <canvas
          ref={canvasEl}
          width={maxVideoWidth}
          height={maxVideoHeight}
          style={styles.canvas}
        />
      </div>
      <div style={styles.colorSelectionContainer}>
        <h2>Select Color:</h2>
        <div style={styles.colorButtonsContainer}>
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => handleColorChange(color.color)}
              style={{
                ...styles.colorButton,
                backgroundColor: color.color,
              }}
            >
              {color.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    gap: "20px",
  },
  videoContainer: {
    display: "flex",
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "#000",
    position: "relative",
  },
  video: {
    width: "50%",
    height: "auto",
  },
  canvas: {
    width: "50%",
    height: "auto",
  },
  colorSelectionContainer: {
    marginTop: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "10px",
    borderRadius: "5px",
  },
  colorButtonsContainer: {
    display: "flex",
    gap: "10px",
  },
  colorButton: {
    cursor: "pointer",
    padding: "10px 20px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
};

export default WebcamAppHand;
