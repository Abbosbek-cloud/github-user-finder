import React from "react";
import { Alert, AlertTitle, Box } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface ErrorMessageProps {
  error: string | null;
  onClose?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Alert severity="error" onClose={onClose} icon={<ErrorOutlineIcon />}>
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;
