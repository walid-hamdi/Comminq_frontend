import React from "react";
import { Text, Input, Button, Box } from "@chakra-ui/react";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <Box>
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        display="none"
        id="file-uploader"
      />
      <label htmlFor="file-uploader">
        <Button cursor="pointer" size="sm" as="span" colorScheme="blue">
          Upload Image
        </Button>
      </label>
      <Text mt={2} fontSize="sm" color="gray.500">
        Accepted file types: JPEG, PNG
      </Text>
    </Box>
  );
};

export default FileUploader;
