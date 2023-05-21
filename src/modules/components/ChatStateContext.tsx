import { ChatStateContext } from "./ChatStateProvider";
import { ReactNode } from "react";
import { useChatState } from "../hooks/useChatState";
import { UserProfile } from "../types/UserProfile";

export interface ChatStateProviderProps {
  openAIKey: string;
  deepgramKey: string;
  profileList: UserProfile[];
  children: ReactNode;
}

export const ChatStateProvider: React.FC<ChatStateProviderProps> = ({
  openAIKey,
  deepgramKey,
  profileList,
  children,
}) => {
  const chatState = useChatState(openAIKey, deepgramKey, profileList);

  return (
    <ChatStateContext.Provider value={chatState}>
      {children}
    </ChatStateContext.Provider>
  );
};
