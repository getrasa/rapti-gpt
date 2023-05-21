import { createContext } from "react";
import { UserProfile } from "../types/UserProfile";
import { InlineFile } from "./chat_inputs/FileAttacher";
import { GptEngine, Message } from "../services/streamGptMessage";
import { SupportedLanguages } from "./chat_content/TextToSpeech";

export interface ChatStateContextValue {
  openAIKey: string;
  deepgramKey: string;
  profileList: UserProfile[];
  attachedFiles: InlineFile[];
  messages: Message[];
  streamBuffer: string;
  model: GptEngine;
  profile: UserProfile | null;
  mainLanguage: SupportedLanguages;
  setAttachedFiles: (files: InlineFile[]) => void;
  setModel: (model: GptEngine) => void;
  handleSendMessage: (messages: Message[], input: string) => Promise<void>;
  handleAttachFiles: (files: InlineFile[]) => void;
  setStreamBuffer: (buffer: string) => void;
  setMessages: (messages: Message[]) => void;
  setProfile: (profile: UserProfile | null) => void;
  setMainLanguage: (language: SupportedLanguages) => void;
}

export const ChatStateContext = createContext<ChatStateContextValue | null>(
  null
);
