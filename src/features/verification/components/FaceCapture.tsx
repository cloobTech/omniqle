// import { useRef, useState, useEffect } from "react";
// import Webcam from "react-webcam";
// import { useModal } from "@src/index";
// import { useAppSelector } from "@src/index";
// import { notifications } from "@mantine/notifications";
// import { useVerifyPersonMutation } from "@features/verification";
// import { Button } from "@mantine/core";
// import * as faceapi from "face-api.js";

// const FaceCapture = ({ personId }: { personId: string }) => {
//   const webcamRef = useRef<Webcam>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const [status, setStatus] = useState<string>("");
//   const [faceOk, setFaceOk] = useState<boolean>(false);
//   const [isTooDark, setIsTooDark] = useState<boolean>(false);
//   const [countdown, setCountdown] = useState<number>(0);
//   const schoolId = useAppSelector((state) => state?.school?.schoolId);
//   const [verifyPerson, { isLoading }] = useVerifyPersonMutation();
//   const { hideModal } = useModal();

//   // Load face-api model
//   useEffect(() => {
//     const loadModels = async () => {
//       try {
//         await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
//         console.log("Model loaded ✅");
//       } catch (error) {
//         console.error("Error loading face-api.js models:", error);
//       }
//     };

//     loadModels();
//   }, []);

//   // Auto-capture when face is centered
//   useEffect(() => {
//     if (faceOk && !capturedImage) {
//       const timer = setTimeout(() => {
//         if (countdown > 0) {
//           setCountdown(countdown - 1);
//         } else {
//           capture();
//           setCountdown(0);
//         }
//       }, 1000);

//       return () => clearTimeout(timer);
//     }
//   }, [faceOk, countdown, capturedImage]);

//   // Face detection
//   useEffect(() => {
//     const interval = setInterval(async () => {
//       const video = webcamRef.current?.video;
//       const canvas = canvasRef.current;

//       if (!video || !canvas || video.readyState !== 4 || capturedImage) return;

//       const detections = await faceapi.detectAllFaces(
//         video,
//         new faceapi.TinyFaceDetectorOptions()
//       );

//       const dims = { width: video.videoWidth, height: video.videoHeight };
//       faceapi.matchDimensions(canvas, dims);

//       const resized = faceapi.resizeResults(detections, dims);
//       const ctx = canvas.getContext("2d");
//       if (!ctx) return;

//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // Draw guide box
//       const guideBoxWidth = 250;
//       const guideBoxHeight = 300;
//       const guideBoxX = (dims.width - guideBoxWidth) / 2;
//       const guideBoxY = (dims.height - guideBoxHeight) / 2;

//       ctx.strokeStyle = faceOk ? "#10B981" : "#EF4444";
//       ctx.lineWidth = 2;
//       ctx.setLineDash([5, 5]);
//       ctx.strokeRect(guideBoxX, guideBoxY, guideBoxWidth, guideBoxHeight);
//       ctx.setLineDash([]);

//       // Draw face detections
//       faceapi.draw.drawDetections(canvas, resized);

//       if (resized.length === 1) {
//         const box = resized[0].box;

//         // Check if face is centered
//         const isCentered =
//           Math.abs(box.x + box.width / 2 - dims.width / 2) < 50 &&
//           Math.abs(box.y + box.height / 2 - dims.height / 2) < 50;

//         // Check if face is properly sized
//         const isGoodSize = box.width > 150 && box.width < 300;

//         const newFaceOk = isCentered && isGoodSize;
//         if (newFaceOk && !faceOk) {
//           setCountdown(3); // Start 3-second countdown when face first becomes centered
//         }
//         setFaceOk(newFaceOk);
//       } else {
//         setFaceOk(false);
//         setCountdown(0);
//       }

//       // Simple brightness check
//       const brightnessCanvas = document.createElement("canvas");
//       brightnessCanvas.width = dims.width;
//       brightnessCanvas.height = dims.height;
//       const bCtx = brightnessCanvas.getContext("2d");
//       if (bCtx) {
//         bCtx.drawImage(video, 0, 0, dims.width, dims.height);
//         const imageData = bCtx.getImageData(0, 0, dims.width, dims.height);
//         const data = imageData.data;
//         let total = 0;
//         for (let i = 0; i < data.length; i += 4) {
//           total += (data[i] + data[i + 1] + data[i + 2]) / 3;
//         }
//         setIsTooDark(total / (data.length / 4) < 60);
//       }
//     }, 500);

//     return () => clearInterval(interval);
//   }, [faceOk, capturedImage]);

//   // Capture image
//   const capture = () => {
//     const imageSrc = webcamRef.current?.getScreenshot();
//     if (imageSrc) {
//       setCapturedImage(imageSrc);
//       setStatus("Image captured Successfully");
//     }
//   };

//   const handleRetakeImage = () => {
//     setCapturedImage(null);
//     setStatus("");
//     setFaceOk(false);
//     setCountdown(0);
//   };

//   const handleUseImage = async () => {
//     if (!capturedImage) return;

//     try {
//       await verifyPerson({
//         schoolId,
//         personId,
//         body: {
//           method: "facial",
//           facial_data: capturedImage.split(",")[1],
//         },
//       }).unwrap();

//       notifications.show({
//         title: "Success",
//         message: "User verified successfully!",
//         color: "green",
//       });
//       hideModal();
//     } catch (err: any) {
//       setStatus(err?.data?.error || "Verification failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col max-w-md mx-auto bg-white rounded-lg p-4">
//       <h2 className="text-lg font-medium mb-2">Face Verification</h2>

//       {!capturedImage ? (
//         <div className="flex flex-col items-center space-y-4">
//           <div className="relative w-full aspect-square max-w-[400px]">
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               videoConstraints={{ facingMode: "user" }}
//               className="rounded-lg border-2 border-gray-200 w-full h-full"
//             />
//             <canvas
//               ref={canvasRef}
//               className="absolute top-0 left-0 w-full h-full pointer-events-none"
//             />
//             {faceOk && countdown > 0 && (
//               <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
//                 <div className="text-white text-4xl font-bold">{countdown}</div>
//               </div>
//             )}
//           </div>

//           <div className="w-full space-y-2">
//             {faceOk ? (
//               <p className="text-green-600 text-sm">
//                 {countdown > 0
//                   ? `Capturing in ${countdown}...`
//                   : "Position maintained - capturing now"}
//               </p>
//             ) : (
//               <p className="text-yellow-600 text-sm text-center">
//                 ⚠️ Center your face within the guide box
//               </p>
//             )}
//             {isTooDark && (
//               <p className="text-yellow-600 text-sm">
//                 💡 The environment is too dark
//               </p>
//             )}
//           </div>
//         </div>
//       ) : (
//         <div className="flex flex-col items-center space-y-4">
//           <img
//             src={capturedImage}
//             alt="Captured"
//             className="rounded-lg border-2 border-gray-200 w-full"
//           />
//           <div className="flex space-x-4 w-full">
//             <Button onClick={handleRetakeImage} variant="outline" fullWidth>
//               Retake
//             </Button>
//             <Button onClick={handleUseImage} loading={isLoading} fullWidth>
//               Confirm
//             </Button>
//           </div>
//         </div>
//       )}

//       {status && (
//         <p
//           className={`mt-2 p-2 rounded text-center ${
//             status.includes("Successfully") ? "✅ bg-green-100" : "bg-red-100"
//           }`}
//         >
//           {status}
//         </p>
//       )}
//     </div>
//   );
// };

// export default FaceCapture;

import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useModal } from "@src/index";
import { useAppSelector } from "@src/index";
import { notifications } from "@mantine/notifications";
import { useVerifyPersonMutation } from "@features/verification";
import { Button } from "@mantine/core";
import * as faceapi from "face-api.js";

const FaceCapture = ({ personId }: { personId: string }) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [faceOk, setFaceOk] = useState<boolean>(false);
  const [isTooDark, setIsTooDark] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  const schoolId = useAppSelector((state) => state?.school?.schoolId);
  const [verifyPerson, { isLoading }] = useVerifyPersonMutation();
  const { hideModal } = useModal();

  // Load face-api model
  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        console.log("Model loaded ✅");
      } catch (error) {
        console.error("Error loading face-api.js models:", error);
      }
    };

    loadModels();
  }, []);

  // Face detection logic
  useEffect(() => {
    const interval = setInterval(async () => {
      const video = webcamRef.current?.video;
      const canvas = canvasRef.current;

      if (!video || !canvas || video.readyState !== 4 || capturedImage) return;

      const detections = await faceapi.detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions()
      );

      const dims = { width: video.videoWidth, height: video.videoHeight };
      faceapi.matchDimensions(canvas, dims);

      const resized = faceapi.resizeResults(detections, dims);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw guide box
      const guideBoxWidth = 300;
      const guideBoxHeight = 350;
      const guideBoxX = (dims.width - guideBoxWidth) / 2;
      const guideBoxY = (dims.height - guideBoxHeight) / 2;

      ctx.strokeStyle = faceOk ? "#10B981" : "#EF4444";
      ctx.lineWidth = 3;
      ctx.setLineDash([]);
      ctx.strokeRect(guideBoxX, guideBoxY, guideBoxWidth, guideBoxHeight);

      // Draw face detections
      faceapi.draw.drawDetections(canvas, resized);

      if (resized.length === 1) {
        const box = resized[0].box;

        // Check if face is centered and properly sized
        const isCentered =
          box.x + box.width / 2 > guideBoxX &&
          box.x + box.width / 2 < guideBoxX + guideBoxWidth &&
          box.y + box.height / 2 > guideBoxY &&
          box.y + box.height / 2 < guideBoxY + guideBoxHeight;

        const isGoodSize = box.width > 150 && box.width < 300;

        setFaceOk(isCentered && isGoodSize);
        if (isCentered && isGoodSize && countdown === 0) {
          setCountdown(3); // Start countdown when face is detected
        }
      } else {
        setFaceOk(false);
        setCountdown(0);
      }

      // Brightness check
      const brightnessCanvas = document.createElement("canvas");
      brightnessCanvas.width = dims.width;
      brightnessCanvas.height = dims.height;
      const bCtx = brightnessCanvas.getContext("2d");
      if (bCtx) {
        bCtx.drawImage(video, 0, 0, dims.width, dims.height);
        const imageData = bCtx.getImageData(0, 0, dims.width, dims.height);
        const data = imageData.data;
        let total = 0;
        for (let i = 0; i < data.length; i += 4) {
          total += (data[i] + data[i + 1] + data[i + 2]) / 3;
        }
        setIsTooDark(total / (data.length / 4) < 60);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [faceOk, capturedImage]);

  // Auto-capture logic
  useEffect(() => {
    if (faceOk && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
        if (countdown === 1) {
          capture();
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [faceOk, countdown]);

  // Capture image
  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
    }
  };

  const handleRetakeImage = () => {
    setCapturedImage(null);
    setFaceOk(false);
    setCountdown(0);
  };

  const handleUseImage = async () => {
    if (!capturedImage) return;

    try {
      await verifyPerson({
        schoolId,
        personId,
        body: {
          method: "facial",
          facial_data: capturedImage.split(",")[1],
        },
      }).unwrap();

      notifications.show({
        title: "Success",
        message: "User verified successfully!",
        color: "green",
      });
      hideModal();
    } catch (err: any) {
      setStatus(err?.data?.error || "Verification failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col max-w-md mx-auto bg-white rounded-lg p-4">
      <h2 className="text-lg font-medium mb-2">Face Verification</h2>

      {!capturedImage ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-full aspect-square max-w-[400px]">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "user" }}
              className="rounded-lg border-2 border-gray-200 w-full h-full"
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            />
            {faceOk && countdown > 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
                <div className="text-white text-4xl font-bold">{countdown}</div>
              </div>
            )}
          </div>

          <div className="w-full space-y-2">
            {faceOk ? (
              <p className="text-green-600 text-sm">
                {countdown > 0
                  ? `Capturing in ${countdown} seconds...`
                  : "Position maintained - capturing now"}
              </p>
            ) : (
              <p className="text-yellow-600 text-sm text-center">
                ⚠️ Center your face within the guide box
              </p>
            )}
            {isTooDark && (
              <p className="text-yellow-600 text-sm">
                💡 The environment is too dark
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <img
            src={capturedImage}
            alt="Captured"
            className="rounded-lg border-2 border-gray-200 w-full"
          />
          <div className="flex space-x-4 w-full">
            <Button onClick={handleRetakeImage} variant="outline" fullWidth>
              Retake
            </Button>
            <Button onClick={handleUseImage} loading={isLoading} fullWidth>
              Confirm
            </Button>
          </div>
        </div>
      )}
      {status && (
        <p
          className={`mt-2 p-2 rounded text-center ${
            status.includes("Successfully") ? "✅ bg-green-100" : "bg-red-100"
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
};

export default FaceCapture;
