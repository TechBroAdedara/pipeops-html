import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { League_Spartan } from "next/font/google";
import "./globals.css";

import { GoogleOAuthProvider } from '@react-oauth/google';


const inter = Inter({ subsets: ["latin"] });
const league_spartan = League_Spartan({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Transcript System",
  description: "streamline transcript management across universities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GoogleOAuthProvider clientId="575600367450-b6uckjuk7gi3drtnsap52nlp0mrmfev3.apps.googleusercontent.com">
      {/* // This is the root Layout File (Our index.html file basically) */}
      <html lang="en">
        <head>
        <link
          rel="icon"
          href="/favicon.ico"
          type="image/x-icon"
          sizes="16x16"
        />
        {/* Google Sign In Credentials */}
        <meta name="google-signin-client_id" content="575600367450-b6uckjuk7gi3drtnsap52nlp0mrmfev3.apps.googleusercontent.com"></meta>
        </head>
        <body className={`${league_spartan.className} bg-gray-100`}>{children}</body>

        {/* Google Sign In */}
        <script src="https://apis.google.com/js/platform.js" async defer></script>
      </html>
    </GoogleOAuthProvider>
    
  );
}
