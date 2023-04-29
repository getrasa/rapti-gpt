// PromptInput.tsx
import React, { KeyboardEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box, { BoxProps } from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

interface PromptInputProps extends BoxProps {
  onSendMessage: (message: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ onSendMessage, sx }) => {
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (event.shiftKey) {
      } else {
        event.preventDefault();
        handleSendMessage();
      }
    }
  };

  return (
    <Box
      component="div"
      display="flex"
      alignItems="center"
      width="100%"
      boxSizing={"border-box"}
      sx={{
        boxShadow:
          "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
        ...sx,
      }}
    >
      <TextField
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message"
        sx={{
          flexGrow: 1,
          marginRight: "8px",
          background: "white",
          borderRadius: 2,
        }}
        multiline={true}
        onSubmit={handleSendMessage}
        maxRows={8}
        size="medium"
        onKeyDown={handleKeyDown}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendMessage}
        sx={{ height: 56 }}
      >
        <SendIcon />
      </Button>
    </Box>
  );
};

export default PromptInput;
