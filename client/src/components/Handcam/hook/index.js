import { useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { Hands, HAND_CONNECTIONS } from "@mediapipe/hands";
import {
  applyZoom,
  setHorizontalRotation,
  setNumber,
  setVerticalRotation,
} from "../../../redux/global";
import { getGlobalDistance } from "../../../utility/utils";

const maxVideoWidth = 920 / 2;
const maxVideoHeight = 540 / 2;

function RecognitionHand() {
  const dispatch = useDispatch();

  const videoElement = useRef(null);
  const hands = useRef(null);
  const camera = useRef(null);
  const canvasEl = useRef(null);

  let lastPalmX = null;
  let lastPalmY = null;

  let lastNumber = 0;
  let handNumberFrames = 0;

  const applyHand = useCallback(
    (screen) => {
      handNumberFrames = lastNumber === screen ? handNumberFrames + 1 : 0;
      if (handNumberFrames > 2) dispatch(setNumber(screen));
      lastNumber = screen;
    },
    [dispatch]
  );

  const processHands = useCallback(
    async (results) => {
      if (canvasEl.current) {
        const glms = results.multiHandWorldLandmarks[0];
        const lms = results.multiHandLandmarks[0];

        const ctx = canvasEl.current.getContext("2d");
        ctx.save();
        ctx.clearRect(0, 0, canvasEl.current.width, canvasEl.current.height);
        ctx.drawImage(results.image, 0, 0, maxVideoWidth, maxVideoHeight);

        if (lms && glms) {
          const openFingers = [
            getGlobalDistance(glms[8], glms[5]) > 0.055 ? 1 : 0,
            getGlobalDistance(glms[12], glms[9]) > 0.07 ? 1 : 0,
            getGlobalDistance(glms[16], glms[13]) > 0.065 ? 1 : 0,
            getGlobalDistance(glms[20], glms[17]) > 0.055 ? 1 : 0,
            getGlobalDistance(glms[4], glms[5]) > 0.05 ? 1 : 0,
          ];

          if (
            getGlobalDistance(glms[8], glms[5]) > 0.045 &&
            !openFingers[1] &&
            !openFingers[2] &&
            !openFingers[3] &&
            getGlobalDistance(glms[4], glms[5]) > 0.04
          ) {
            const distance = getGlobalDistance(glms[4], glms[8]);
            const percent = (distance / 0.01) * 10;
            dispatch(applyZoom(percent));
          }

          if (
            !openFingers[0] &&
            !openFingers[1] &&
            !openFingers[2] &&
            !openFingers[3] &&
            openFingers[4]
          )
            applyHand(0);
          if (
            openFingers[0] &&
            !openFingers[1] &&
            !openFingers[2] &&
            !openFingers[3] &&
            !openFingers[4]
          )
            applyHand(1);
          if (
            openFingers[0] &&
            openFingers[1] &&
            !openFingers[2] &&
            !openFingers[3] &&
            !openFingers[4]
          )
            applyHand(2);
          if (
            openFingers[0] &&
            openFingers[1] &&
            openFingers[2] &&
            !openFingers[3] &&
            !openFingers[4]
          )
            applyHand(3);

          if (lastPalmX === null || lastPalmY === null) {
            lastPalmX = lms[0].x;
            lastPalmY = lms[0].y;
          } else {
            if (
              openFingers[0] &&
              openFingers[1] &&
              openFingers[2] &&
              openFingers[3]
            ) {
              if (lms[0].x - lastPalmX < 0.1 && lms[0].x - lastPalmX > -0.1) {
                dispatch(setHorizontalRotation(lastPalmX - lms[0].x));
              }
              if (lms[0].y - lastPalmY < 0.1 && lms[0].y - lastPalmY > -0.1) {
                dispatch(setVerticalRotation(lastPalmY - lms[0].y));
              }
              lastPalmX = lms[0].x;
              lastPalmY = lms[0].y;
            }
          }

          drawConnectors(ctx, lms, HAND_CONNECTIONS, {
            color: "#00ffff",
            lineWidth: 0.5,
          });
          drawLandmarks(ctx, lms, { color: "#ffff29", lineWidth: 0.1 });
        }

        ctx.restore();
      }
    },
    [dispatch, applyHand]
  );

  const loadHands = useCallback(() => {
    if (!hands.current) {
      hands.current = new Hands({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        },
      });
      hands.current.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });
      hands.current.onResults(processHands);
    }
  }, [processHands]);

  useEffect(() => {
    async function initCamara() {
      camera.current = new Camera(videoElement.current, {
        onFrame: async () => {
          await hands.current.send({ image: videoElement.current });
        },
        width: maxVideoWidth,
        height: maxVideoHeight,
      });
      camera.current.start();
    }

    initCamara();
    loadHands();
  }, [loadHands]);

  return { maxVideoHeight, maxVideoWidth, canvasEl, videoElement };
}

export default RecognitionHand;
