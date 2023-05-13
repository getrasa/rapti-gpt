import { InlineFile } from "../components/chat_inputs/FileAttacher";

export const removeWhiteSpace = (inputString: string): string => {
  return inputString.replace(/\s+/g, "");
};

function removeExtraWhitespace(input: string): string {
  return input.replace(/\s+/g, " ").trim();
}

export const minimiazeAttachedFiles = (files: InlineFile[]): string => {
  return files.reduce((acc, file) => {
    return (
      acc +
      ` ${"\n" + file.name + "\n```" + removeExtraWhitespace(file.content) + "```"}`
    );
  }, "");
};
