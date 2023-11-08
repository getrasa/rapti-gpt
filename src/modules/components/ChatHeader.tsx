import ChatSettings from "./chat_header/ChatSettings";
import ProfileSelect from "./chat_header/ProfileSelect";
import React, { useContext, useState } from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Box } from "@mui/material";
import { ChatStateContext } from "./ChatStateProvider";
import { GptEngine } from "../services/streamGptMessage";
import { styled } from "@mui/material/styles";
import { UserProfile } from "../types/UserProfile";

const GptChatHeader = styled(Box)({
  width: "100%",
  height: 28,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 16px",
  background: "#272932",
  boxSizing: "border-box",
  borderBottom: "0.5px solid rgba(255, 255, 255, 0.2)",
  color: "#C5C5D2",
  fontSize: 13,

  position: "relative",
});

const ChatHeader: React.FC = ({}) => {
  const toggleModelChange = (model: GptEngine) => {
    const newModel =
      model === GptEngine.GPT35 ? GptEngine.GPT4TurboPreview : GptEngine.GPT35;
    setModel(newModel);
  };

  const context = useContext(ChatStateContext);

  const { model, setModel, setMessages, profileList, profile, setProfile } =
    context!;

  return (
    <GptChatHeader>
      <ProfileSelect
        profileList={profileList}
        selectedProfile={profile}
        onSelect={(selectedProfile) => setProfile(selectedProfile)}
      />
      <Box
        onClick={() => toggleModelChange(model)}
        sx={{ cursor: "pointer", userSelect: "none" }}
      >
        Model: {model}
      </Box>
      <Box
        sx={{
          position: "absolute",
          right: 8,
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box onClick={() => setMessages([])}>
          <RestartAltIcon fontSize="small" />
        </Box>
        <ChatSettings />
      </Box>
    </GptChatHeader>
  );
};
export default ChatHeader;
