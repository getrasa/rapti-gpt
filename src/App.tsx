import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import ChatWindow from "./GptChat";
import { Box } from "@mui/material";
import SettingsSidebar from "./modules/components/SettingsSidebar";

function App() {
  const [openAIKey, setOpenAIKey] = React.useState("");
  const [windowCount, setWindowCount] = React.useState<number | null>(null);
  const [windowSize, setWindowSize] = React.useState<number | null>(null);

  useEffect(() => {
    const apiKeyString = localStorage.getItem("openAiApiKey");
    const apiKey = apiKeyString ? JSON.parse(apiKeyString) : "";
    const windowCount = localStorage.getItem("windowCount");
    const windowSize = localStorage.getItem("windowSize");
    if (apiKey || windowCount || windowSize) {
      setOpenAIKey(apiKey);
      setWindowCount(parseInt(windowCount || "2"));
      setWindowSize(parseInt(windowSize || ""));
    }
  }, []);

  useEffect(() => {
    if (openAIKey) {
      localStorage.setItem("openAiApiKey", JSON.stringify(openAIKey));
    }
  }, [openAIKey]);

  useEffect(() => {
    if (windowCount) {
      localStorage.setItem("windowCount", JSON.stringify(windowCount));
    }
  }, [windowCount]);

  useEffect(() => {
    if (windowSize===null || windowSize){
    localStorage.setItem("windowSize", JSON.stringify(windowSize));
    }
  }, [windowSize]);

  console.log("windowSize", windowSize);
  return (
    <Box display="flex" flexDirection="row" sx={{ background: "#C5C5D2" }}>
      <SettingsSidebar
        openAIKey={openAIKey}
        setOpenAIKey={setOpenAIKey}
        windowCount={windowCount}
        setWindowCount={setWindowCount}
        windowSize={windowSize}
        setWindowSize={setWindowSize}
      />
      <Box
        flex={1}
        boxSizing={"border-box"}
        p={1}
        height={"100vh"}
        sx={{ display: "flex", overflowY: "scroll" }}
      >
        {Array.from(Array(windowCount || 0).keys()).map((index) => (
          <Box pr={1} sx={windowSize ? { minWidth: windowSize } : { flex: 1 }}>
            <ChatWindow apiKey={openAIKey} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default App;
