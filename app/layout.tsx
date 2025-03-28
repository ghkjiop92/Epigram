// app/layout.tsx
import "../styles/globals.css";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head />
      <body>
        <Navbar />
        {children}
        <div id="portal" /> 
      </body>
    </html>
  );
}
