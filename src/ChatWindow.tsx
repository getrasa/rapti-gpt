import FileDisplayer from "./modules/components/FileDisplayer";
import GptChatHeaderComponent from "./modules/components/ChatHeader";
import MessageItem from "./modules/components/MessageItem";
import PromptInput from "./modules/components/PromptInput";
import React, { useState } from "react";
import { Box, styled } from "@mui/material";
import { minimiazeAttachedFiles } from "./modules/hooks/processAttachedFiles";
import { UserProfile } from "./modules/types/UserProfile";
import { v4 as uuidv4 } from "uuid";
import {
  GptEngine,
  Message,
  streamGptMessage,
} from "./modules/hooks/streamGptMessage";
import FileUploadButton, {
  InlineFile,
} from "./modules/components/FileAttacher";

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
  const [attachedFiles, setAttachedFiles] = useState<InlineFile[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
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
    const attachments = minimiazeAttachedFiles(attachedFiles);
    const newMessage: Message = {
      id: messageId,
      role: "user",
      content: input + attachments,
    };
    const baseMessages = systemMessage
      ? [systemMessage, ...messages]
      : messages;
    setMessages([...messages, newMessage]);
    setAttachedFiles([]);

    await streamGptMessage(
      openAIKey,
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

  const handleAttachFiles = (files: InlineFile[]) => {
    const newFiles = files.filter((x) =>
      !attachedFiles.some((y) => y.name === x.name)
    );
    const newAttachedFiles = [...attachedFiles, ...newFiles];
    setAttachedFiles(newAttachedFiles);
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
      <Box p={2}>
        <Box display="flex" flexDirection="row" pb={1}>
          <FileUploadButton onFilesContent={handleAttachFiles} />
          <FileDisplayer
            sx={{ pl: 1 }}
            files={attachedFiles}
            setAttachedFiles={(files) => setAttachedFiles(files)}
          />
        </Box>
        <PromptInput
          sx={{ p: 0, borderRadius: 2 }}
          boxSizing={"border-box"}
          deepgramKey={deepgramKey}
          onSendMessage={(input) => handleSendMessage(messages, input)}
        />
      </Box>
    </GptChatWrapper>
  );
};

export default ChatWindow;
