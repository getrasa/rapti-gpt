import MessageItem from "./chat_content/MessageItem";
import React, { useContext } from "react";
import { Box } from "@mui/material";
import { ChatStateContext } from "./ChatStateProvider";
import { v4 as uuidv4 } from "uuid";

const ChatContent: React.FC = () => {
  const context = useContext(ChatStateContext);
  const { messages, streamBuffer, handleSendMessage } = context!;
  return (
    <Box flex={1} sx={{ overflowY: "auto" }}>
      {messages.map((message, index) => (
        <MessageItem
          key={index}
          messageItem={message}
          updateMessage={(message: string, id: string) => {
            const messageIndex = messages.findIndex(
              (message) => message.id === id
            );
            const messagesBefore = messages.slice(0, messageIndex);
            handleSendMessage([...messagesBefore], message);
          }}
        />
      ))}
      {streamBuffer && (
        <MessageItem
          key={999}
          messageItem={{
            role: "Assistant",
            content: streamBuffer,
            id: uuidv4(),
          }}
          updateMessage={() => {}}
        />
      )}
    </Box>
  );
};

export default ChatContent;
