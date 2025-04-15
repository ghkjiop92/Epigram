import '../../styles/globals.scss';
import Navbar from '../../components/Navbar';
import Providers from '../providers';

export default function WithNavBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Navbar />
      {children}
    </Providers>
  );
}
