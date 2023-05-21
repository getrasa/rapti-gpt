import axios, { AxiosResponse } from "axios";
  
interface DeepgramResponse {
  data: {
    url: string;
  };
}

export async function getDeepgramTranscription(
  secret_key: string,
  audioBlob: Blob
): Promise<AxiosResponse<DeepgramResponse>> {
  const data = new FormData();
  data.append("file", audioBlob);

  const headers = {
    Authorization: `Token ${secret_key}`,
    "Content-Type": "multipart/form-data",
  };

  return await axios.post<DeepgramResponse>(
    // "https://api.deepgram.com/v1/listen?model=nova&punctuate=true",
    // "https://api.deepgram.com/v1/listen?model=whisper-large&detect_language=true",
    // "https://api.deepgram.com/v1/listen?model=whisper-large&detect_language=true&punctuate=true&diarize=true",
    "https://api.deepgram.com/v1/listen?model=whisper-large&detect_language=true&punctuate=true",
    data,
    { headers }
  );
}