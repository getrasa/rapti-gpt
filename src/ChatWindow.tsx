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
import { v4 as uuidv4 } from "uuid";
import { UserProfile } from "./modules/types/UserProfile";
// import { profileList } from "./modules/profileList";

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
  profileList: UserProfile[];
}



const ChatWindow: React.FC<ChatWindowProps> = ({ apiKey, profileList }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [streamBuffer, setStreamBuffer] = useState<string>("");
  const [model, setModel] = useState<GptEngine>(GptEngine.GPT35);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const getSystemMessage = (profile: UserProfile): Message => {
    return {
      id: uuidv4(),
      role: "system",
      content: profile.content,
    };
  };

  const systemMessage = profile ? getSystemMessage(profile) : null;

  const handleSendMessage = async (messages: Message[], input: string) => {
    const messageId: string = uuidv4();
    const newMessage: Message = { id: messageId, role: "user", content: input };
    const baseMessages = systemMessage ? [systemMessage, ...messages] : messages;
    setMessages([...messages, newMessage]);
    setInput("");

    await streamGptMessage(
      apiKey,
      [...baseMessages, newMessage],
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
      <GptChatHeaderComponent
        model={model}
        setModel={setModel}
        resetMessages={() => setMessages([])}
        profile={profile}
        profileList={profileList}
        setProfile={setProfile}
      ></GptChatHeaderComponent>
      <Box flex={1} sx={{ overflowY: "auto" }}>
        {messages.map((message, index) => (
          <MessageItem
            key={index}
            messageItem={message}
            updateMessage={(message: string, id: string) => {
              const messageIndex = messages.findIndex(
                (message) => message.id === id
              );
              // extract array items from 0 to messageIndex
              const messagesBefore = messages.slice(0, messageIndex);
              // const newMessage = { role: "user", content: message, id: id };
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
      <Box p={2}>
        <PromptInput
          sx={{ p: 0, borderRadius: 2 }}
          boxSizing={"border-box"}
          onSendMessage={(input) => handleSendMessage(messages, input)}
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

// interface MessageStreamItemProps {
//   sender: string;
//   messages: Message[];
// }

// const MessageStreamItem: React.FC<MessageStreamItemProps> = ({
//   sender,
//   messages,
// }) => {
//   const [streamBuffer, setStreamBuffer] = useState<string>("");

//   return <MessageItem sender={sender} message={streamBuffer} />;
// };
