import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  GptEngine,
  Message,
  streamGptMessage,
} from "../services/streamGptMessage";
import { UserProfile } from "../types/UserProfile";
import { InlineFile } from "../components/chat_inputs/FileAttacher";
import { minimiazeAttachedFiles } from "../services/processAttachedFiles";
import { SupportedLanguages } from "../components/chat_content/TextToSpeech";

export const useChatState = (
  openAIKey: string,
  deepgramKey: string,
  profileList: UserProfile[]
) => {
  const [attachedFiles, setAttachedFiles] = useState<InlineFile[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamBuffer, setStreamBuffer] = useState<string>("");
  const [model, setModel] = useState<GptEngine>(GptEngine.GPT35);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [mainLanguage, setMainLanguage] = useState<SupportedLanguages>(
    SupportedLanguages.English
  );

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
    const newFiles = files.filter(
      (x) => !attachedFiles.some((y) => y.name === x.name)
    );
    const newAttachedFiles = [...attachedFiles, ...newFiles];
    setAttachedFiles(newAttachedFiles);
  };

  return {
    openAIKey,
    deepgramKey,
    profileList,
    attachedFiles,
    messages,
    streamBuffer,
    model,
    profile,
    mainLanguage,
    setAttachedFiles,
    setModel,
    handleSendMessage,
    handleAttachFiles,
    setStreamBuffer,
    setMessages,
    setProfile,
    setMainLanguage,
  };
};
