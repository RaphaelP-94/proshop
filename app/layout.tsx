// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/assets/styles/globals.css';
import {APP_NAME, APP_DESCRIPTION} from '@/lib/constants';
import { ThemeProvider } from "next-themes";

const inter = Inter({subsets: ['latin']});



export const metadata: Metadata = {
  title: {
    template: `%s | Prostore`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange enableSystem>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
