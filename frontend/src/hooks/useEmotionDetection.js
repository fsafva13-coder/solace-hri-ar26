import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const useEmotionDetection = (videoRef) => {
  const [emotions, setEmotions] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODELS_URL = "https://justadudewhohacks.github.io/face-api.js/models";
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODELS_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODELS_URL);
        console.log("✅ SOLACE models loaded!");
        setIsReady(true);
      } catch (err) {
        console.error("❌ Model load failed:", err);
      }
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (!isReady || !videoRef?.current) return;

    intervalRef.current = setInterval(async () => {
      const video = videoRef.current;
      if (!video || video.paused || video.ended) return;

      const detection = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detection) {
        setEmotions(detection.expressions);
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isReady, videoRef]);

  return { emotions, isReady };
};

export default useEmotionDetection;