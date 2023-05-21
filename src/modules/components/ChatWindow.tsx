import ChatContent from "./ChatContent";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import React from "react";
import { Box, styled } from "@mui/material";
import { ChatStateProvider } from "./ChatStateContext";
import { UserProfile } from "../types/UserProfile";

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
  openAIKey: string;
  deepgramKey: string;
  profileList: UserProfile[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  openAIKey,
  profileList,
  deepgramKey,
}) => {
  return (
    <ChatStateProvider
      openAIKey={openAIKey}
      deepgramKey={deepgramKey}
      profileList={profileList}
    >
      <GptChatWrapper>
        <ChatHeader />
        <ChatContent />
        <Box p={2}>
          <ChatInput />
        </Box>
      </GptChatWrapper>
    </ChatStateProvider>
  );
};

export default ChatWindow;
