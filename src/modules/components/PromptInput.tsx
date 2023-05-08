// PromptInput.tsx
import React, { KeyboardEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box, { BoxProps } from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import AudioRecorder from "./AudioRecorder";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";

interface PromptInputProps extends BoxProps {
  deepgramKey: string;
  onSendMessage: (message: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ onSendMessage, sx, deepgramKey }) => {
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
      <Box position="relative" display="flex" alignItems="center" width="100%">
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
          InputProps={{ style: { paddingRight: "42px" } }}
          multiline={true}
          onSubmit={handleSendMessage}
          maxRows={8}
          size="medium"
          onKeyDown={handleKeyDown}
        />
        <AudioRecorder
        deepgramKey={deepgramKey}
          sx={{
            position: "absolute",
            top: "50%",
            right: "16px",
            transform: "translateY(-50%)",
          }}
          onRecorded={() => console.log("recorded")}
          onProcessed={(transcript) => {
            setInput(input + transcript);
          }}
        />
      </Box>
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
