import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ChatWindow from "./ChatWindow";
import { Box } from "@mui/material";
import SettingsSidebar from "./modules/components/SettingsSidebar";
import { UserProfile } from "./modules/types/UserProfile";

function App() {
  const [openAIKey, setOpenAIKey] = React.useState("");
  const [windowCount, setWindowCount] = React.useState<number | null>(null);
  const [windowSize, setWindowSize] = React.useState<number | null>(null);
  const [profileList, setProfileList] = React.useState<UserProfile[] | null>(null);

  useEffect(() => {
    const apiKeyString = localStorage.getItem("openAiApiKey");
    const apiKey = apiKeyString ? JSON.parse(apiKeyString) : "";
    const windowCount = localStorage.getItem("windowCount");
    const windowSize = localStorage.getItem("windowSize");
    const profileListString = localStorage.getItem("profileList");
    if (apiKey) {
      setOpenAIKey(apiKey);
    }
    if (windowCount) {
      setWindowCount(parseInt(windowCount));
    }
    if (windowSize) {
      setWindowSize(parseInt(windowSize));
    }
    if (profileListString) {
      setProfileList(JSON.parse(profileListString));
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
    if (windowSize && !isNaN(windowSize)){
    localStorage.setItem("windowSize", JSON.stringify(windowSize));
    }
  }, [windowSize]);

  useEffect(() => {
    if (profileList) {
      localStorage.setItem("profileList", JSON.stringify(profileList));
    }
  }, [JSON.stringify(profileList)]);

  return (
    <Box display="flex" flexDirection="row" sx={{ background: "#C5C5D2" }}>
      <SettingsSidebar
        openAIKey={openAIKey}
        setOpenAIKey={setOpenAIKey}
        windowCount={windowCount}
        setWindowCount={setWindowCount}
        windowSize={windowSize}
        setWindowSize={setWindowSize}
        profileList={profileList || []}
        setProfileList={setProfileList}
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
            <ChatWindow apiKey={openAIKey} profileList={profileList || []} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default App;
