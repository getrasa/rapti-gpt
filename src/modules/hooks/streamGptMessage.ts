export interface Message {
  id: string;
  role: string;
  content: string;
}

export enum GptEngine {
  GPT3 = "gpt-3",
  GPT4 = "gpt-4",
  GPT35 = "gpt-3.5-turbo",
}

export const streamGptMessage = async (
  apiKey: string,
  messages: Message[],
  model: GptEngine,
  setMessage: (message: string) => void,
  onFinish?: (message: string) => void
) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  const data = {
    model: model,
    messages: messages.map((x) => ({ role: x.role, content: x.content })),
    stream: true,
  };

  var buffer = "";
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const dataChunks = chunk.split("data: ");
        dataChunks.forEach((dataChunk) => {
          const jsonChunk = extractJSON(dataChunk);
          if (jsonChunk) {
            const content = jsonChunk[0].choices[0].delta?.content || "";
            buffer += content;
            setMessage(buffer);
          }
        });
      }
      onFinish && onFinish(buffer);
    }
  } catch (error: any) {
    throw new Error("Failed to fetch from the API", error);
  }
};

function extractJSON(str: string) {
  var firstOpen: any, firstClose, candidate;
  firstOpen = str.indexOf("{", firstOpen + 1);
  do {
    firstClose = str.lastIndexOf("}");
    if (firstClose <= firstOpen) {
      return null;
    }
    do {
      candidate = str.substring(firstOpen, firstClose + 1);
      try {
        var res = JSON.parse(candidate);
        return [res, firstOpen, firstClose + 1];
      } catch (e) {
      }
      firstClose = str.substr(0, firstClose).lastIndexOf("}");
    } while (firstClose > firstOpen);
    firstOpen = str.indexOf("{", firstOpen + 1);
  } while (firstOpen != -1);
}
