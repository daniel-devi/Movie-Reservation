import React from "react";
import { Chip } from "@mui/material";

// Define the props type
interface StatusChipProps {
  type: "success" | "error";
  message: string;
}

// StatusChip component with type annotations
const StatusChip: React.FC<StatusChipProps> = ({ type, message }) => {
  // Use 'success' and 'error' correctly as valid MUI color values
  const color: "success" | "error" = type; // Set color based on the 'type'
  
  return <Chip label={message} color={color}  sx={{mb: 3, justifyContent: "center"}} />;
};

export default StatusChip;
