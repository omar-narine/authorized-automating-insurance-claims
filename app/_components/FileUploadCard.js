"use client";
import { Button, Card, CardBody, CardHeader, Input, Chip } from "@heroui/react";
import { NewFile, CheckIcon, CloseIcon } from "@heroui/shared-icons";
import { useState } from "react";

export default function FileUploadCard({
  title,
  color = "primary",
  onFileChange,
  file,
  preview,
  onRemoveFile,
}) {
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (selectedFile) => {
    if (selectedFile) {
      onFileChange(selectedFile);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getColorClasses = () => {
    switch (color) {
      case "primary":
        return {
          border: "hover:border-primary",
          icon: "text-primary",
          button: "primary",
        };
      case "secondary":
        return {
          border: "hover:border-secondary",
          icon: "text-secondary",
          button: "secondary",
        };
      default:
        return {
          border: "hover:border-primary",
          icon: "text-primary",
          button: "primary",
        };
    }
  };

  const colorClasses = getColorClasses();

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <NewFile className={colorClasses.icon} />
          <h3 className="text-lg font-semibold">{title}</h3>
          {file && (
            <Chip color="success" variant="flat" size="sm">
              <div className="flex items-center gap-2">
                <CheckIcon className="w-3 h-3" />
                Uploaded
              </div>
            </Chip>
          )}
        </div>
      </CardHeader>
      <CardBody className="pt-0">
        {!file ? (
          <div
            className={`border-2 border-dashed border-divider rounded-lg p-6 text-center transition-colors ${
              dragActive ? colorClasses.border : ""
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <NewFile className="w-12 h-12 text-default-400 mx-auto mb-4" />
            <p className="text-sm text-default-500 mb-4">
              Drag and drop your {title} here, or click to browse
            </p>
            <Input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e.target.files[0])}
              className="hidden"
              id={`${title.toLowerCase().replace(/\s+/g, "-")}-upload`}
            />
            <Button
              color={colorClasses.button}
              variant="bordered"
              onClick={() =>
                document
                  .getElementById(
                    `${title.toLowerCase().replace(/\s+/g, "-")}-upload`
                  )
                  .click()
              }
            >
              Choose File
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-default-50 dark:bg-default-100 rounded-lg">
              <div className="flex items-center gap-3">
                <NewFile className={`w-8 h-8 ${colorClasses.icon}`} />
                <div>
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-xs text-default-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                color="danger"
                onClick={onRemoveFile}
              >
                <CloseIcon className="w-4 h-4" />
              </Button>
            </div>

            {/* File Preview */}
            {preview && (
              <div className="border rounded-lg p-4">
                <h4 className="text-sm font-medium mb-2">Preview:</h4>
                {typeof preview === "string" ? (
                  <img
                    src={preview}
                    alt={`${title} Preview`}
                    className="max-w-full h-auto rounded border"
                  />
                ) : (
                  <div className="text-sm text-default-500">
                    <p>
                      <strong>File:</strong> {preview.name}
                    </p>
                    <p>
                      <strong>Size:</strong> {formatFileSize(preview.size)}
                    </p>
                    <p>
                      <strong>Type:</strong> {preview.type}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
