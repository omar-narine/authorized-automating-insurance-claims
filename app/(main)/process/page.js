"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Progress,
  Chip,
  Divider,
  Spinner,
} from "@heroui/react";
import { CheckIcon, WarningIcon, InfoIcon } from "@heroui/shared-icons";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ProcessPage() {
  const searchParams = useSearchParams();
  const [paFormData, setPaFormData] = useState(null);
  const [referralData, setReferralData] = useState(null);
  const [processingStatus, setProcessingStatus] = useState("loading"); // loading, processing, completed, error
  const [apiResults, setApiResults] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  // Simulated API calls - replace these with your actual API endpoints
  const apiCalls = {
    // Extract text from PDFs
    extractText: async (fileData) => {
      console.log("Extracting text from:", fileData.name);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return {
        success: true,
        text: `Extracted text from ${fileData.name}`,
        pages: Math.floor(Math.random() * 10) + 1,
      };
    },

    // Analyze document structure
    analyzeStructure: async (fileData) => {
      console.log("Analyzing structure of:", fileData.name);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return {
        success: true,
        structure: {
          sections: ["header", "body", "footer"],
          fields: ["patient_name", "date", "diagnosis", "treatment"],
        },
      };
    },

    // Validate document completeness
    validateDocument: async (fileData) => {
      console.log("Validating document:", fileData.name);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        success: true,
        isValid: Math.random() > 0.3, // 70% success rate
        missingFields: Math.random() > 0.5 ? ["signature", "date"] : [],
      };
    },

    // Compare documents for consistency
    compareDocuments: async (paForm, referral) => {
      console.log("Comparing documents for consistency");
      await new Promise((resolve) => setTimeout(resolve, 2500));
      return {
        success: true,
        consistency: Math.random() > 0.2, // 80% consistency rate
        discrepancies:
          Math.random() > 0.6 ? ["patient_id", "diagnosis_date"] : [],
      };
    },
  };

  const processingSteps = [
    {
      name: "Loading Documents",
      description: "Preparing files for processing",
    },
    {
      name: "Text Extraction",
      description: "Extracting text from PDF documents",
    },
    {
      name: "Structure Analysis",
      description: "Analyzing document structure and fields",
    },
    {
      name: "Document Validation",
      description: "Validating document completeness",
    },
    {
      name: "Cross-Reference Check",
      description: "Comparing documents for consistency",
    },
    {
      name: "Final Processing",
      description: "Generating final analysis report",
    },
  ];

  useEffect(() => {
    // Get file data from URL parameters (you might want to use a more robust state management solution)
    const paFormParam = searchParams.get("paForm");
    const referralParam = searchParams.get("referral");

    if (paFormParam && referralParam) {
      try {
        setPaFormData(JSON.parse(decodeURIComponent(paFormParam)));
        setReferralData(JSON.parse(decodeURIComponent(referralParam)));
        setProcessingStatus("processing");
        startProcessing();
      } catch (error) {
        console.error("Error parsing file data:", error);
        setProcessingStatus("error");
      }
    } else {
      setProcessingStatus("error");
    }
  }, [searchParams]);

  const startProcessing = async () => {
    try {
      const results = {};

      // Step 1: Text Extraction
      setCurrentStep(1);
      setProgress(16);
      results.paFormText = await apiCalls.extractText(paFormData);
      results.referralText = await apiCalls.extractText(referralData);

      // Step 2: Structure Analysis
      setCurrentStep(2);
      setProgress(33);
      results.paFormStructure = await apiCalls.analyzeStructure(paFormData);
      results.referralStructure = await apiCalls.analyzeStructure(referralData);

      // Step 3: Document Validation
      setCurrentStep(3);
      setProgress(50);
      results.paFormValidation = await apiCalls.validateDocument(paFormData);
      results.referralValidation = await apiCalls.validateDocument(
        referralData
      );

      // Step 4: Cross-Reference Check
      setCurrentStep(4);
      setProgress(66);
      results.comparison = await apiCalls.compareDocuments(
        paFormData,
        referralData
      );

      // Step 5: Final Processing
      setCurrentStep(5);
      setProgress(83);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Complete
      setCurrentStep(6);
      setProgress(100);
      setApiResults(results);
      setProcessingStatus("completed");
    } catch (error) {
      console.error("Processing error:", error);
      setProcessingStatus("error");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "error":
        return "danger";
      case "processing":
        return "warning";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckIcon className="w-4 h-4" />;
      case "error":
        return <WarningIcon className="w-4 h-4" />;
      case "processing":
        return <Spinner size="sm" />;
      default:
        return <InfoIcon className="w-4 h-4" />;
    }
  };

  if (processingStatus === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" className="mb-4" />
          <p className="text-default-500">Loading documents...</p>
        </div>
      </div>
    );
  }

  if (processingStatus === "error") {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="text-center">
            <CardBody className="py-12">
              <WarningIcon className="w-16 h-16 text-danger mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Error Loading Documents
              </h2>
              <p className="text-default-500 mb-6">
                There was an error loading the documents. Please return to the
                upload page and try again.
              </p>
              <Button color="primary" onClick={() => window.history.back()}>
                Go Back
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Document Processing
          </h1>
          <p className="text-default-500">
            Analyzing your PA Form and Referral Package
          </p>
        </div>

        {/* Processing Status */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              {getStatusIcon(processingStatus)}
              <h3 className="text-lg font-semibold">
                Processing Status:{" "}
                {processingStatus.charAt(0).toUpperCase() +
                  processingStatus.slice(1)}
              </h3>
              <Chip
                color={getStatusColor(processingStatus)}
                variant="flat"
                size="sm"
              >
                {currentStep}/{processingSteps.length}
              </Chip>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <Progress value={progress} color="primary" className="w-full" />
              <div className="text-sm text-default-500">
                {currentStep > 0 && currentStep <= processingSteps.length && (
                  <p>
                    <strong>Current Step:</strong>{" "}
                    {processingSteps[currentStep - 1].name}
                  </p>
                )}
                {currentStep > 0 && currentStep <= processingSteps.length && (
                  <p>{processingSteps[currentStep - 1].description}</p>
                )}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Document Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* PA Form Display */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">PA Form</h3>
            </CardHeader>
            <CardBody>
              {paFormData && (
                <div className="space-y-4">
                  <div className="bg-default-50 dark:bg-default-100 p-4 rounded-lg">
                    <p>
                      <strong>File:</strong> {paFormData.name}
                    </p>
                    <p>
                      <strong>Size:</strong>{" "}
                      {(paFormData.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <p>
                      <strong>Type:</strong> {paFormData.type}
                    </p>
                  </div>
                  {paFormData.type === "application/pdf" ? (
                    <div className="border rounded-lg p-4 text-center">
                      <p className="text-default-500">
                        PDF Preview would be displayed here
                      </p>
                      <p className="text-sm text-default-400 mt-2">
                        In a real implementation, you would embed the PDF viewer
                        here
                      </p>
                    </div>
                  ) : (
                    <div className="border rounded-lg p-4">
                      <img
                        src={paFormData.preview}
                        alt="PA Form Preview"
                        className="max-w-full h-auto rounded"
                      />
                    </div>
                  )}
                </div>
              )}
            </CardBody>
          </Card>

          {/* Referral Package Display */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Referral Package</h3>
            </CardHeader>
            <CardBody>
              {referralData && (
                <div className="space-y-4">
                  <div className="bg-default-50 dark:bg-default-100 p-4 rounded-lg">
                    <p>
                      <strong>File:</strong> {referralData.name}
                    </p>
                    <p>
                      <strong>Size:</strong>{" "}
                      {(referralData.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <p>
                      <strong>Type:</strong> {referralData.type}
                    </p>
                  </div>
                  {referralData.type === "application/pdf" ? (
                    <div className="border rounded-lg p-4 text-center">
                      <p className="text-default-500">
                        PDF Preview would be displayed here
                      </p>
                      <p className="text-sm text-default-400 mt-2">
                        In a real implementation, you would embed the PDF viewer
                        here
                      </p>
                    </div>
                  ) : (
                    <div className="border rounded-lg p-4">
                      <img
                        src={referralData.preview}
                        alt="Referral Package Preview"
                        className="max-w-full h-auto rounded"
                      />
                    </div>
                  )}
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* API Results */}
        {apiResults && (
          <Card className="mb-6">
            <CardHeader>
              <h3 className="text-lg font-semibold">Processing Results</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-success-50 dark:bg-success-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-success-700 dark:text-success-400 mb-2">
                      Text Extraction
                    </h4>
                    <p className="text-sm text-success-600 dark:text-success-300">
                      Successfully extracted text from both documents
                    </p>
                  </div>
                  <div className="bg-info-50 dark:bg-info-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-info-700 dark:text-info-400 mb-2">
                      Structure Analysis
                    </h4>
                    <p className="text-sm text-info-600 dark:text-info-300">
                      Identified document sections and fields
                    </p>
                  </div>
                  <div
                    className={`p-4 rounded-lg ${
                      apiResults.paFormValidation.isValid &&
                      apiResults.referralValidation.isValid
                        ? "bg-success-50 dark:bg-success-900/20"
                        : "bg-warning-50 dark:bg-warning-900/20"
                    }`}
                  >
                    <h4
                      className={`font-semibold mb-2 ${
                        apiResults.paFormValidation.isValid &&
                        apiResults.referralValidation.isValid
                          ? "text-success-700 dark:text-success-400"
                          : "text-warning-700 dark:text-warning-400"
                      }`}
                    >
                      Document Validation
                    </h4>
                    <p
                      className={`text-sm ${
                        apiResults.paFormValidation.isValid &&
                        apiResults.referralValidation.isValid
                          ? "text-success-600 dark:text-success-300"
                          : "text-warning-600 dark:text-warning-300"
                      }`}
                    >
                      {apiResults.paFormValidation.isValid &&
                      apiResults.referralValidation.isValid
                        ? "All documents are valid"
                        : "Some validation issues found"}
                    </p>
                  </div>
                  <div
                    className={`p-4 rounded-lg ${
                      apiResults.comparison.consistency
                        ? "bg-success-50 dark:bg-success-900/20"
                        : "bg-warning-50 dark:bg-warning-900/20"
                    }`}
                  >
                    <h4
                      className={`font-semibold mb-2 ${
                        apiResults.comparison.consistency
                          ? "text-success-700 dark:text-success-400"
                          : "text-warning-700 dark:text-warning-400"
                      }`}
                    >
                      Cross-Reference Check
                    </h4>
                    <p
                      className={`text-sm ${
                        apiResults.comparison.consistency
                          ? "text-success-600 dark:text-success-300"
                          : "text-warning-600 dark:text-warning-300"
                      }`}
                    >
                      {apiResults.comparison.consistency
                        ? "Documents are consistent"
                        : "Some discrepancies found"}
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            color="primary"
            size="lg"
            onClick={() => window.history.back()}
          >
            Back to Upload
          </Button>
          {processingStatus === "completed" && (
            <Button
              color="success"
              size="lg"
              onClick={() => {
                // Handle next steps - could navigate to results page
                alert("Proceeding to next step...");
              }}
            >
              Continue Processing
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
