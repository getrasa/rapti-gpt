import AttachFileIcon from "@mui/icons-material/AttachFile";
import React from "react";
import { Box, IconButton } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

export interface InlineFile {
  id: string;
  name: string;
  content: string;
}

interface FileUploadButtonProps {
  onFilesContent: (files: InlineFile[]) => void;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  onFilesContent,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleButtonClicked = () => {
    fileInputRef.current?.click();
  };

  const handleFilesSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const contentsPromises = Array.from(files).map((file) => {
        return new Promise<InlineFile>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () =>
            resolve({
              id: uuidv4(),
              name: file.name,
              content: reader.result as string,
            });
          reader.onerror = () => reject;
          reader.readAsText(file);
        });
      });
      Promise.all(contentsPromises).then((fileData) =>
        onFilesContent(fileData)
      );
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <input
        type="file"
        multiple
        // accept="text/plain"
        hidden
        ref={fileInputRef}
        onChange={handleFilesSelected}
      />
      <IconButton
        sx={{ background: "#C5C5D2", "&:hover": { background: "white" } }}
        size="small"
        onClick={handleButtonClicked}
      >
        <AttachFileIcon />
      </IconButton>
    </Box>
  );
};

export default FileUploadButton;
