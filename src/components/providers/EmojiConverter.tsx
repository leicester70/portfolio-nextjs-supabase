import React, { Children } from "react";
import EmojiConvertor from "emoji-js";

// Initialize the EmojiConvertor
const emoji = new EmojiConvertor();

// Create a new context
export const EmojiContext = React.createContext(emoji);

interface Props {
  children: React.ReactNode;
}

export function EmojiProvider({ children }: Props) {
  return (
    <EmojiContext.Provider value={emoji}>{children}</EmojiContext.Provider>
  );
}
