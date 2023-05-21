import AudioRecorder from "./AudioRecorder";
import Box, { BoxProps } from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { KeyboardEvent, useContext } from "react";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import { ChatStateContext } from "../ChatStateProvider";

interface PromptInputProps extends BoxProps {
  value: string;
  setInput: (input: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ value, setInput, sx }) => {
  const context = useContext(ChatStateContext);
  const {
    attachedFiles,
    deepgramKey,
    messages,
    handleSendMessage: sendMessage,
  } = context!;

  const handleSendMessage = () => {
    if (value.trim()) {
      sendMessage(messages, value);
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
          value={value}
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
            setInput(value + transcript);
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
