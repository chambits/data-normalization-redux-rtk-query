import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  error: unknown;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onRetry }) => {
  const getErrorMessage = (error: unknown): string => {
    if (typeof error === "string") return error;
    if (error && typeof error === "object") {
      const errorObj = error as Record<string, unknown>;
      if (errorObj.data && typeof errorObj.data === "object") {
        const dataObj = errorObj.data as Record<string, unknown>;
        if (typeof dataObj.error === "string") return dataObj.error;
      }
      if (typeof errorObj.message === "string") return errorObj.message;
      if (typeof errorObj.error === "string") return errorObj.error;
    }
    return "An unexpected error occurred";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Something went wrong
        </h3>
        <p className="text-red-600 mb-4">{getErrorMessage(error)}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
