import React, { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { GptEngine } from "../hooks/streamGptMessage";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ProfileSelect from "./ProfileSelect";
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

interface GptChatHeaderProps {
  model: GptEngine;
  setModel: (model: GptEngine) => void;
  resetMessages: () => void;
  profileList: UserProfile[];
  profile: UserProfile | null;
  setProfile: (profile: UserProfile | null) => void;
}

const GptChatHeaderComponent: React.FC<GptChatHeaderProps> = ({
  model,
  setModel,
  resetMessages,
  profileList,
  profile,
  setProfile,
}) => {
  const toggleModelChange = (model: GptEngine) => {
    const newModel =
      model === GptEngine.GPT35 ? GptEngine.GPT4 : GptEngine.GPT35;
    setModel(newModel);
  };

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
      onClick={() => resetMessages()}
        sx={{
          position: "absolute",
          right: 8,
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <RestartAltIcon fontSize="small" />
      </Box>
    </GptChatHeader>
  );
};
export default GptChatHeaderComponent;
