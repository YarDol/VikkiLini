import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import SceneApp from "../components/Scene";
import WebcamApp from "../components/Handcam";

const HandLive = () => {
  return (
    <>
      <Link
        to="/"
        style={{ position: "absolute", top: 20, right: 20, zIndex: 100 }}
      >
        <button>Back to Main Page</button>
      </Link>
      <WebcamApp />
      <SceneApp />
    </>
  );
};

export default HandLive;
