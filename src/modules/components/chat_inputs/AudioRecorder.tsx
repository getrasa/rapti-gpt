import CircularProgress from "@mui/material/CircularProgress";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import React, { useEffect, useState } from "react";
import { getDeepgramTranscription } from "../../services/deepgramTranscription";
import { IconButton, SxProps, Tooltip } from "@mui/material";
import { useAudioRecorder } from "react-audio-voice-recorder";

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

  const [processing, setProcessing] = useState(false);

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
      setProcessing(true);
      const response = await getDeepgramTranscription(
        deepgramKey,
        recordingBlob
      );
      onProcessed(
        (response.data as any).results.channels[0].alternatives[0].transcript
      );
      setProcessing(false);
    };
    processRecording();
  }, [recordingBlob]);

  // TODO: Prevent the shortcut from activating recording on all windows
  // useEffect(() => {
  //   const onKeyDown = (event: KeyboardEvent) => {
  //     if (event.ctrlKey && event.key === "r") {
  //       event.preventDefault();
  //       toggleRecording();
  //     }
  //   };

  //   window.addEventListener("keydown", onKeyDown);
  //   return () => window.removeEventListener("keydown", onKeyDown);
  // }, []);

  return (
    <Tooltip open={isRecording} title={`Recording: ${recordingTime}`} arrow>
      <IconButton sx={sx} onClick={toggleRecording} disabled={processing}>
        {processing ? (
          <CircularProgress size={18} />
        ) : isRecording ? (
          <MicOffIcon />
        ) : (
          <MicIcon />
        )}
      </IconButton>
    </Tooltip>
  );
};
export default AudioRecorder;
