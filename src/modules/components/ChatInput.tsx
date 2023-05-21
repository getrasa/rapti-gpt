import FileDisplayer from "./chat_inputs/FileDisplayer";
import FileUploadButton from "./chat_inputs/FileAttacher";
import PromptInput from "./chat_inputs/PromptInput";
import React, { useContext, useState } from "react";
import { Box } from "@mui/system";
import { ChatStateContext } from "./ChatStateProvider";

const ChatInput: React.FC = () => {
  const [input, setInput] = useState("");
  const context = useContext(ChatStateContext);
  const { attachedFiles, setAttachedFiles, handleAttachFiles } = context!;

  return (
    <>
      <Box display="flex" flexDirection="row" pb={1}>
        <FileUploadButton onFilesContent={handleAttachFiles} />
        <FileDisplayer
          sx={{ pl: 1 }}
          files={attachedFiles}
          onFileClick={(file) => setInput(input + "`" + file.name + "`")}
          setAttachedFiles={(files) => setAttachedFiles(files)}
        />
      </Box>
      <PromptInput
        sx={{ p: 0, borderRadius: 2 }}
        value={input}
        setInput={setInput}
      />
    </>
  );
};

export default ChatInput;
