'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './AuthNavigation.module.scss';

interface AuthNavigationProps {
  children: React.ReactNode;
}

export default function AuthNavigation({ children }: AuthNavigationProps) {
  return (
    <>
      <nav className={styles.navContainer}>
        <Link href="/">
          <Image
            src="/images/Book.png"
            alt="Book logo"
            width={36}
            height={36}
            className={styles['book-logo']}
            priority
          />
        </Link>
        <Link href="/">
          <Image
            src="/images/Epigram.png"
            alt="Epigram logo"
            width={91}
            height={26}
            className={styles['Epigram-logo']}
            priority
          />
        </Link>
      </nav>
      <main>{children}</main>
    </>
  );
}
