// SettingsSidebar.tsx
import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import KeyIcon from "@mui/icons-material/VpnKey";
import CountIcon from "@mui/icons-material/ViewModule";
import SizeIcon from "@mui/icons-material/AspectRatio";
import { MenuItem } from "@mui/material";

interface SettingsSidebarProps {
  openAIKey: string;
  setOpenAIKey: (key: string) => void;
  windowCount: number | null;
  setWindowCount: (count: number | null) => void;
  windowSize: number | null;
  setWindowSize: (size: number | null) => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  openAIKey,
  setOpenAIKey,
  windowCount,
  setWindowCount,
  windowSize,
  setWindowSize,
}) => {
  const [openDialog, setOpenDialog] = useState<"key" | "count" | "size" | null>(
    null
  );

  const handleClose = () => {
    setOpenDialog(null);
  };

  return (
    <Box
      sx={{
        width: 32,
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // background: "#272932",
        background: "#18191A",
        padding: "16px",
      }}
    >
      <IconButton onClick={() => setOpenDialog("key")}>
        <KeyIcon sx={{ color: "#C5C5D2" }} />
      </IconButton>
      <IconButton onClick={() => setOpenDialog("count")}>
        <CountIcon sx={{ color: "#C5C5D2" }} />
      </IconButton>
      <IconButton onClick={() => setOpenDialog("size")}>
        <SizeIcon sx={{ color: "#C5C5D2" }} />
      </IconButton>

      <Dialog open={openDialog !== null} onClose={handleClose} fullWidth>
        <DialogTitle>
          {openDialog === "key"
            ? "OpenAI Key"
            : openDialog === "count"
            ? "Window Count"
            : "Window Size"}
        </DialogTitle>
        <DialogContent>
          <Box py={1}>
            {openDialog === "key" && (
              <TextField
                label="OpenAI Key"
                value={openAIKey}
                onChange={(e) => {
                    setOpenAIKey(e.target.value);
                }}
                variant="outlined"
                size="small"
                fullWidth
              />
            )}
            {openDialog === "count" && (
              <TextField
                label="Window Count"
                select
                value={windowCount}
                onChange={(e) => setWindowCount(parseInt(e.target.value))}
                variant="outlined"
                size="small"
                fullWidth
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </TextField>
            )}
            {openDialog === "size" && (
              <TextField
                label="Window Size"
                type="number"
                value={windowSize}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value >= 100 && value <= 2000) {
                    setWindowSize(parseInt(e.target.value));
                  } else {
                    setWindowSize(null);
                  }
                }}
                variant="outlined"
                size="small"
                fullWidth
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default SettingsSidebar;
