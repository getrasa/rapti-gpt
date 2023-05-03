// MessageItem.tsx
import React, { useState } from "react";
import Box from "@mui/material/Box";
import CircularProfile from "./CircularProfile";
import CodeBlock from "./CodeBlock";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { TextField } from "@mui/material";
import { KeyboardEvent } from "react";
import { Message } from "../hooks/streamGptMessage";

interface MessageItemProps {
  messageItem: Message;
  updateMessage: (message: string, id: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({
  messageItem,
  updateMessage,
}) => {
  const sender = messageItem.role;
  const message = messageItem.content;
  const id = messageItem.id;
  const [editing, setEditing] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(message);

  const isUser = sender === "user";

  const processMessage = (message: string) => {
    const codeBlockRegex = /```([\s\S]*?)```/g;

    const messageParts = [];
    let lastIndex = 0;

    let match;
    while ((match = codeBlockRegex.exec(message)) !== null) {
      const code = match[1];
      const codeBlockStartIndex = match.index;
      const codeBlockEndIndex = codeBlockRegex.lastIndex;

      if (lastIndex !== codeBlockStartIndex) {
        const textBeforeCode = message.slice(lastIndex, codeBlockStartIndex);
        messageParts.push(
          textBeforeCode.split("\n").map((line, index) => (
            <p
              style={{ margin: 0, marginTop: 4, marginBottom: 12 }}
              key={`${lastIndex}-${index}`}
            >
              {line}
            </p>
          ))
        );
      }

      messageParts.push(
        <Box>
          <CodeBlock
            key={`code-${codeBlockStartIndex}`}
            code={code}
            language="javascript"
          />
        </Box>
      );

      lastIndex = codeBlockEndIndex;
    }

    if (lastIndex < message.length) {
      const remainingText = message.slice(lastIndex);
      messageParts.push(
        remainingText.split("\n").map((line, index) => (
          <p
            style={{ margin: 0, marginTop: 4, marginBottom: 12 }}
            key={`${lastIndex}-${index}`}
          >
            {line}
          </p>
        ))
      );
    }

    return messageParts;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (event.shiftKey) {
      } else {
        event.preventDefault();
        setEditing(false);
        updateMessage(editValue, id);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        color: "#C5C5D2",
        background: isUser ? "#272932" : null,
        position: "relative",
      }}
      py={3}
      px={2}
    >
      <Box px={2}>
        <CircularProfile size={42} name={sender} />
      </Box>
      {!editing ? (
        <Box maxWidth="100%" sx={{ overflowX: "auto" }} pr={2} width="100%">
          {processMessage(message)}
        </Box>
      ) : (
        <TextField
          fullWidth
          multiline
          value={editValue}
          inputProps={{ style: { color: "#C5C5D2" } }}
          onChange={(e) => setEditValue(e.target.value)}
          maxRows={8}
          size="medium"
          onKeyDown={handleKeyDown}
        />
      )}
      {isUser && !editing && (
        <Box
          onClick={() => setEditing(true)}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <EditNoteIcon fontSize="medium" />
        </Box>
      )}
    </Box>
  );
};

export default MessageItem;
