import { InlineFile } from "../components/FileAttacher";


export const removeWhiteSpace = (inputString: string): string => {
    return inputString.replace(/\s+/g, "");
  }

export const minimiazeAttachedFiles = (files: InlineFile[]): string => {
    return files.reduce((acc, file) => {
      return (
        acc + ` ${"\n" + file.name + "\n```" + removeWhiteSpace(file.content) + "```"}`
      );
    }, "");
  };
