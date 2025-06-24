"use client";
import { Button, Card, CardBody, CardHeader, Progress } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUploadCard from "./_components/FileUploadCard";

export default function UploadPage() {
  const router = useRouter();
  const [paFormFile, setPaFormFile] = useState(null);
  const [referralFile, setReferralFile] = useState(null);
  const [paFormPreview, setPaFormPreview] = useState(null);
  const [referralPreview, setReferralPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = (file, setFile, setPreview, fileType) => {
    if (file) {
      setFile(file);

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        // For non-image files, show file info
        setPreview({
          name: file.name,
          size: file.size,
          type: file.type,
        });
      }
    }
  };

  const removeFile = (setFile, setPreview) => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async () => {
    if (!paFormFile || !referralFile) {
      alert("Please upload both files before proceeding.");
      return;
    }

    setIsUploading(true);

    // After brief progress, navigate to process page
    setTimeout(() => {
      setIsUploading(false);

      // Prepare file data for navigation
      const paFormData = {
        name: paFormFile.name,
        size: paFormFile.size,
        type: paFormFile.type,
        preview: paFormPreview,
      };

      const referralData = {
        name: referralFile.name,
        size: referralFile.size,
        type: referralFile.type,
        preview: referralPreview,
      };

      // Navigate to process page with file data
      const queryParams = new URLSearchParams({
        paForm: encodeURIComponent(JSON.stringify(paFormData)),
        referral: encodeURIComponent(JSON.stringify(referralData)),
      });

      router.push(`/process?${queryParams.toString()}`);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Document Upload
          </h1>
          <p className="text-default-500">
            Upload your PA Form and Referral Package for processing
          </p>
        </div>

        {/* Upload Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* PA Form Upload */}
          <FileUploadCard
            title="PA Form"
            color="primary"
            file={paFormFile}
            preview={paFormPreview}
            onFileChange={(file) =>
              handleFileUpload(file, setPaFormFile, setPaFormPreview, "PA Form")
            }
            onRemoveFile={() => removeFile(setPaFormFile, setPaFormPreview)}
          />

          {/* Referral Package Upload */}
          <FileUploadCard
            title="Referral Package"
            color="secondary"
            file={referralFile}
            preview={referralPreview}
            onFileChange={(file) =>
              handleFileUpload(
                file,
                setReferralFile,
                setReferralPreview,
                "Referral Package"
              )
            }
            onRemoveFile={() => removeFile(setReferralFile, setReferralPreview)}
          />
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <Card className="mb-6">
            <CardBody>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Preparing documents...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress
                  value={uploadProgress}
                  color="primary"
                  className="w-full"
                />
              </div>
            </CardBody>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            color="primary"
            size="lg"
            onPress={handleSubmit}
            isDisabled={!paFormFile || !referralFile || isUploading}
            isLoading={isUploading}
          >
            {isUploading ? "Preparing..." : "Process Documents"}
          </Button>
          <Button
            variant="bordered"
            size="lg"
            onPress={() => {
              setPaFormFile(null);
              setReferralFile(null);
              setPaFormPreview(null);
              setReferralPreview(null);
            }}
            isDisabled={isUploading}
          >
            Clear All
          </Button>
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <h3 className="text-lg font-semibold">Upload Instructions</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-2 text-sm text-default-600">
              <p>
                <strong>PA Form:</strong> Upload the Prior Authorization form
                document
              </p>
              <p>
                <strong>Referral Package:</strong> Upload the complete referral
                documentation package
              </p>
              <p>
                <strong>Supported formats:</strong> PDF, DOC, DOCX, JPG, JPEG,
                PNG
              </p>
              <p>
                <strong>Maximum file size:</strong> 50MB per file
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
