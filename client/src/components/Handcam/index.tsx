import React from "react";
import RecognitionHand from "./hook";

function WebcamApp() {
  const { videoElement, maxVideoWidth, maxVideoHeight, canvasEl } =
    RecognitionHand();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 10,
      }}
    >
      <video className="video" playsInline ref={videoElement} />
      <canvas ref={canvasEl} width={maxVideoWidth} height={maxVideoHeight} />
    </div>
  );
}

export default WebcamApp;
