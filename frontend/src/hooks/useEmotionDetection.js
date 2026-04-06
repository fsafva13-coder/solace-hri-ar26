import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const useEmotionDetection = (videoRef) => {
  const [emotions, setEmotions] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const intervalRef = useRef(null);

  // Step 1: Load the models from /models folder
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      console.log("✅ SOLACE models loaded!");
      setIsReady(true);
    };
    loadModels();
  }, []);

  // Step 2: Start detecting emotions every second
  useEffect(() => {
    if (!isReady || !videoRef?.current) return;

    intervalRef.current = setInterval(async () => {
      const video = videoRef.current;
      if (!video || video.paused || video.ended) return;

      const detection = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detection) {
        const scores = detection.expressions;
        setEmotions(scores);
        console.log("😊 Detected emotions:", scores);
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isReady, videoRef]);

  return { emotions, isReady };
};

export default useEmotionDetection;
