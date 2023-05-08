import { IconButton, SxProps, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { getDeepgramTranscription } from "../hooks/deepgramTranscription";

interface AudioRecorderProps {
  deepgramKey: string;
  onRecorded: (audioBlob: Blob) => void;
  onProcessed: (transcription: string) => void;
  sx?: SxProps;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onRecorded,
  onProcessed,
  sx,
  deepgramKey,
}) => {
  const {
    startRecording,
    stopRecording,
    recordingBlob,
    isRecording,
    recordingTime,
  } = useAudioRecorder();

  const toggleRecording = async () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  useEffect(() => {
    if (!recordingBlob) return;

    onRecorded(recordingBlob);

    const processRecording = async () => {
      const response = await getDeepgramTranscription(
        deepgramKey,
        recordingBlob
      );
      onProcessed(
        (response.data as any).results.channels[0].alternatives[0].transcript
      );
      console.log(response);
    };
    processRecording();
  }, [recordingBlob]);
  return (
    <Tooltip open={isRecording} title={`Recording: ${recordingTime}`} arrow>
      <IconButton sx={sx} onClick={toggleRecording}>
        {isRecording ? <MicOffIcon /> : <MicIcon />}
      </IconButton>
    </Tooltip>
  );
};
export default AudioRecorder;
