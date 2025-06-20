import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { useModal } from "@src/index";
import { useAppSelector } from "@src/index";
import { notifications } from "@mantine/notifications";
import { useVerifyPersonMutation } from "@features/verification";
import { Button } from "@mantine/core";

const FaceCapture = ({ personId }: { personId: string }) => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const schoolId = useAppSelector((state) => state?.school?.schoolId);
  const [verifyPerson, { isLoading }] = useVerifyPersonMutation();

  const { hideModal } = useModal();

  // Capture image and return base64 string
  const capture = (): string | undefined => {
    if (!webcamRef.current) {
      setStatus("Webcam not ready");
      return;
    }

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      setStatus("Failed to capture image");
      return;
    }

    setCapturedImage(imageSrc);
    setStatus("Image captured successfully");
    return imageSrc;
  };

  const handleRetakeImage = () => {
    setCapturedImage(null);
    setStatus("");
  };

  // Handle using the captured image
  const handleUseImage = async () => {
    if (!capturedImage) {
      setStatus("No image captured");
      return;
    }

    // Just the base64 data without the prefix
    const base64Data = capturedImage.split(",")[1];
    const body = {
      method: "facial",
      facial_data: base64Data,
    };

    try {
      await verifyPerson({
        schoolId,
        personId,
        body: body,
      }).unwrap();

      notifications.show({
        title: "Success",
        message: "User successfully verified!",
        color: "green",
        position: "top-right",
      });
      hideModal();
    } catch (err: unknown) {
      const message =
        (err as any)?.data?.details?.mismatches?.[0]?.message ??
        (err as any)?.data?.error ??
        "Something went wrong. Please try again.";
      setStatus(message);
    }
  };

  return (
    <div className="flex flex-col max-w-md mx-auto bg-white rounded-lg">
      <small>Capture image</small>
      {!capturedImage ? (
        <div className="flex flex-col space-y-4">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "user",
              width: 400,
              height: 400,
            }}
            className="rounded-lg border-2 border-gray-200"
          />
          <Button onClick={capture}>Capture Face</Button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <img
            src={capturedImage}
            alt="Captured face"
            className="rounded-lg border-2 border-gray-200 max-w-full h-auto"
          />
          <div className="flex space-x-4">
            <Button onClick={handleRetakeImage} color="gray">
              Retake
            </Button>
            <Button onClick={handleUseImage} disabled={isLoading}>
              {isLoading ? "Verifying User..." : "Verify User"}
            </Button>
          </div>
        </div>
      )}

      {status && (
        <p
          className={`mt-4 p-2 rounded-md ${
            status.includes("Error")
              ? "bg-red-100 text-red-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
};

export default FaceCapture;
