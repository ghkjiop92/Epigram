import '../styles/globals.scss';
import Navbar from '../components/Navbar';
import Providers from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head />
      <body>
        <Providers>
          {/* <Navbar />*/}
          {children}
        </Providers>
        <div id="portal" />
      </body>
    </html>
  );
}
