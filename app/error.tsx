"use client";

import { useEffect } from "react";

import EmptyState from "@/app/components/EmptyState";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      title="Oops !"
      subtitle="An error occured during the loading process."
    />
  );
};

export default ErrorState;
