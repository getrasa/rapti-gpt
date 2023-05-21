import { IconButton } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
export enum SupportedLanguages {
  English = "en-AU",
  Polish = "pl-PL",
  Japanese = "ja-JP",
  Spanish = "es-ES",
  Chinese = "zh-CN",
  Italian = "it-IT",
  Russian = "ru-RU",
}

interface TextToSpeechProps {
  text: string;
  language: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text, language }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const speechSynthesis = window.speechSynthesis;

  useEffect(() => {
    const fetchVoices = () => {
      const voices = speechSynthesis.getVoices();
      const selectedVoice = voices.find((v) => v.lang === language);
      setVoice(selectedVoice || voices[0]);
    };

    speechSynthesis.addEventListener("voiceschanged", fetchVoices);
    fetchVoices();
    return () => {
      speechSynthesis.removeEventListener("voiceschanged", fetchVoices);
    };
  }, [language]);

  const speak = useCallback(() => {
    if (!voice) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;

    if (!isSpeaking) {
      setIsSpeaking(true);
      speechSynthesis.speak(utterance);

      utterance.onend = () => {
        setIsSpeaking(false);
      };
    } else {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [text, voice, isSpeaking]);

  return (
    <IconButton
      onClick={speak}
      sx={{ color: isSpeaking ? "#C5C5D2" : "#C5C5D2" }}
    >
      {isSpeaking ? <VolumeOffIcon /> : <VolumeUpIcon />}
    </IconButton>
  );
};

export default TextToSpeech;
