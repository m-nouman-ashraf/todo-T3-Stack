import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "~/components/themeProvider";
import { Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkProvider>
        <Toaster />
        <Component {...pageProps} />
      </ClerkProvider>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
