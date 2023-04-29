import React, { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { GptEngine } from "../hooks/streamGptMessage";

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
  cursor: "pointer",
  userSelect: "none",
});

interface GptChatHeaderProps {
  model: GptEngine;
  setModel: (model: GptEngine) => void;
}

const GptChatHeaderComponent: React.FC<GptChatHeaderProps> = ({
    model, setModel,
}) => {

  const toggleModelChange = (model: GptEngine) => {
    const newModel = model === GptEngine.GPT35 ? GptEngine.GPT4: GptEngine.GPT35;
    setModel(newModel);
  };

  return (
    <GptChatHeader onClick={() => toggleModelChange(model)}>
      Model: {model}
    </GptChatHeader>
  );
};
export default GptChatHeaderComponent;
