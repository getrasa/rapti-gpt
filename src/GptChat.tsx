import React, { useState } from "react";
import { Box, styled } from "@mui/material";
import PromptInput from "./modules/components/PromptInput";
import {
  GptEngine,
  Message,
  streamGptMessage,
} from "./modules/hooks/streamGptMessage";
import MessageItem from "./modules/components/MessageItem";
import GptChatHeaderComponent from "./modules/components/ChatHeader";

const GptChatWrapper = styled(Box)({
  width: "100%",
  background: "#343642",
  maxWidth: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: 4,
  overflow: "hidden",
  boxSizing: "border-box",
  fontFamily: "Roboto",
  fontSize: 16,
});

interface ChatWindowProps {
  apiKey: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ apiKey }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [streamBuffer, setStreamBuffer] = useState<string>("");
  const [model, setModel] = useState<GptEngine>(GptEngine.GPT35);

  const handleSendMessage = async (input: string) => {
    const newMessage: Message = { id: "", role: "user", content: input };
    setMessages([...messages, newMessage]);
    setInput("");

    await streamGptMessage(
      apiKey,
      [...messages, newMessage],
      model,
      setStreamBuffer,
      (message) => {
        setMessages([
          ...messages,
          newMessage,
          { id: "", role: "assistant", content: message },
        ]);
        setStreamBuffer("");
      }
    );
  };

  return (
    <GptChatWrapper>
      <GptChatHeaderComponent model={model} setModel={setModel}></GptChatHeaderComponent>
      <Box flex={1} sx={{ overflowY: "auto" }}>
        {messages.map((message, index) => (
          <MessageItem
            key={index}
            sender={message.role}
            message={message.content}
          />
        ))}
        {streamBuffer && (
          <MessageItem key={999} sender={"Assistant"} message={streamBuffer} />
        )}
      </Box>
      <Box p={2}>
        <PromptInput
          sx={{ p: 0, borderRadius: 2 }}
          boxSizing={"border-box"}
          onSendMessage={handleSendMessage}
        />
      </Box>
    </GptChatWrapper>
  );
};

export default ChatWindow;

// interface MessageItemProps {
//   sender: string;
//   message: string;
// }

// const MessageItem: React.FC<MessageItemProps> = ({ sender, message }) => {
//   const isUser = sender === "user";
//   return (
//     <Box sx={{ display: "flex", flexDirection: "row", color: "white", background: isUser ? "#272932" : null}} py={3}>
//       <Box px={2}>
//         <CircularProfile size={42} name={sender} />
//       </Box>
//       <Box width={"100%"}>
//         {message.split("\n").map((line, index) => (
//           <p key={index}>{line}</p>
//           // line
//         ))}
//       </Box>
//     </Box>
//   );
// };

interface MessageStreamItemProps {
  sender: string;
  messages: Message[];
}

const MessageStreamItem: React.FC<MessageStreamItemProps> = ({
  sender,
  messages,
}) => {
  const [streamBuffer, setStreamBuffer] = useState<string>("");

  return <MessageItem sender={sender} message={streamBuffer} />;
};
