"use client";

import { ThemeProvider } from 'next-themes';

export const ThemeContext = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};
