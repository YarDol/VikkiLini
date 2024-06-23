import { useEffect, useRef } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Holistic } from "@mediapipe/holistic";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

const maxVideoWidth = 920 / 2;
const maxVideoHeight = 540 / 2;

function RecognitionHook(selectedColor) {
  const videoElement = useRef(null);
  const faceMesh = useRef(null);
  const holistic = useRef(null);
  const camera = useRef(null);
  const canvasEl = useRef(null);

  const processFaceMesh = (results) => {
    const canvasCtx = canvasEl.current.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasEl.current.width, canvasEl.current.height);
    canvasCtx.drawImage(results.image, 0, 0, maxVideoWidth, maxVideoHeight);

    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        const reducedLandmarks = landmarks.filter(
          (_, index) => index % 5 === 0
        );
        drawConnectors(
          canvasCtx,
          reducedLandmarks,
          FaceMesh.FACEMESH_TESSELATION,
          {
            color: selectedColor,
            lineWidth: 1,
          }
        );
        drawLandmarks(canvasCtx, reducedLandmarks, {
          color: selectedColor,
          lineWidth: 0.5,
        });
      }
    }
    canvasCtx.restore();
  };

  const processHolistic = (results) => {
    const canvasCtx = canvasEl.current.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasEl.current.width, canvasEl.current.height);
    canvasCtx.drawImage(results.image, 0, 0, maxVideoWidth, maxVideoHeight);

    if (results.faceLandmarks) {
      drawConnectors(
        canvasCtx,
        results.faceLandmarks,
        Holistic.FACEMESH_TESSELATION,
        {
          color: selectedColor,
          lineWidth: 1,
        }
      );
      drawLandmarks(canvasCtx, results.faceLandmarks, {
        color: selectedColor,
        lineWidth: 0.5,
      });
    }

    if (results.poseLandmarks) {
      drawConnectors(
        canvasCtx,
        results.poseLandmarks,
        Holistic.POSE_CONNECTIONS,
        {
          color: selectedColor,
          lineWidth: 2,
        }
      );
      drawLandmarks(canvasCtx, results.poseLandmarks, {
        color: selectedColor,
        lineWidth: 2,
      });
    }

    if (results.leftHandLandmarks) {
      drawConnectors(
        canvasCtx,
        results.leftHandLandmarks,
        Holistic.HAND_CONNECTIONS,
        {
          color: selectedColor,
          lineWidth: 1,
        }
      );
      drawLandmarks(canvasCtx, results.leftHandLandmarks, {
        color: selectedColor,
        lineWidth: 2,
      });
    }

    if (results.rightHandLandmarks) {
      drawConnectors(
        canvasCtx,
        results.rightHandLandmarks,
        Holistic.HAND_CONNECTIONS,
        {
          color: selectedColor,
          lineWidth: 1,
        }
      );
      drawLandmarks(canvasCtx, results.rightHandLandmarks, {
        color: selectedColor,
        lineWidth: 2,
      });
    }

    canvasCtx.restore();
  };

  useEffect(() => {
    faceMesh.current = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });
    faceMesh.current.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    faceMesh.current.onResults(processFaceMesh);

    holistic.current = new Holistic({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      },
    });
    holistic.current.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    holistic.current.onResults(processHolistic);

    if (videoElement.current) {
      camera.current = new Camera(videoElement.current, {
        onFrame: async () => {
          await faceMesh.current.send({ image: videoElement.current });
          await holistic.current.send({ image: videoElement.current });
        },
        width: maxVideoWidth,
        height: maxVideoHeight,
      });
      camera.current.start();
    }
  }, [selectedColor]);

  return {
    maxVideoHeight,
    maxVideoWidth,
    canvasEl,
    videoElement,
  };
}

export default RecognitionHook;
