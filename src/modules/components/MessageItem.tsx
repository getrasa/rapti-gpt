// MessageItem.tsx
import React from "react";
import Box from "@mui/material/Box";
import CircularProfile from "./CircularProfile";
import CodeBlock from "./CodeBlock";

interface MessageItemProps {
  sender: string;
  message: string;
}

const MessageItem: React.FC<MessageItemProps> = ({ sender, message }) => {
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
          textBeforeCode
            .split("\n")
            .map((line, index) => <p style={{margin: 0, marginTop: 4, marginBottom: 12}} key={`${lastIndex}-${index}`}>{line}</p>)
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
        remainingText
          .split("\n")
          .map((line, index) => <p style={{margin: 0, marginTop: 4, marginBottom: 12}} key={`${lastIndex}-${index}`}>{line}</p>)
      );
    }

    return messageParts;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        color: "#C5C5D2",
        background: isUser ? "#272932" : null,
      }}
      py={3} px={2}
    >
      <Box px={2}>
        <CircularProfile size={42} name={sender} />
      </Box>
      <Box maxWidth="100%" sx={{ overflowX: "auto" }} pr={2} width="100%">
        {processMessage(message)}
      </Box>
    </Box>
  );
};

export default MessageItem;
