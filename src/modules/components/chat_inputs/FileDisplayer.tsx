import FileTile from "./FileTile";
import React from "react";
import { Box, SxProps, Typography } from "@mui/material";
import { InlineFile } from "./FileAttacher";

interface FileDisplayerProps {
  files: InlineFile[];
  onFileClick?: (file: InlineFile) => void;
  setAttachedFiles: (files: InlineFile[]) => void;
  sx: SxProps | undefined;
}

const FileDisplayer: React.FC<FileDisplayerProps> = ({
  files,
  onFileClick,
  setAttachedFiles,
  sx,
}) => {
  const deleteItemById = (id: string) => {
    const newFiles = files.filter((file) => file.id !== id);
    setAttachedFiles(newFiles);
  };

  return (
    <Box
      sx={{ ...sx }}
      display="flex"
      flexDirection="row"
      justifyContent="space-evenly"
      flexWrap="wrap"
    >
      {files.map((file, index) => (
        <FileTile
          key={index}
          file={file}
          onClick={onFileClick}
          onDelete={(id: string) => deleteItemById(id)}
        />
      ))}
    </Box>
  );
};

export default FileDisplayer;
