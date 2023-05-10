import { Box, BoxProps, IconButton, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { FunctionComponent } from "react";
import { InlineFile } from "./FileAttacher";

interface FileTileProps {
  file: InlineFile;
  onDelete: (id: string) => void;
  boxProps?: BoxProps;
}

const FileTile: FunctionComponent<FileTileProps> = ({
  file,
  onDelete,
  boxProps = {},
}) => {
  const handleClose = () => onDelete(file.id);

  return (
    <Box
      bgcolor="#272932"
      color="black"
      p={1}
      mx={0.5}
      borderRadius={2}
      boxShadow={1}
      position="relative"
      sx={{ cursor: "pointer", boxShadow: 1, border: "2px solid #18191A" }}
      {...boxProps}
    >
      <Typography color="#C5C5D2" variant="body1">
        {file.name}
      </Typography>
      <Box position="absolute" top={-9} right={-9}>
        <IconButton
          sx={{
            background: "#18191A",
            width: 18,
            height: 18,
            p: 0,
            m: 0,
            "&:hover": { background: "#272932" },
          }}
          color="inherit"
          aria-label="delete"
          onClick={handleClose}
        >
          <CloseIcon sx={{ fontSize: 14, color: "#C5C5D2" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default FileTile;
