'use client';

import React from 'react';
import Link from 'next/link';
import WideButton from './WideButton';
import styles from './CommonRoutingButton.module.css';

interface CommonRoutingButtonProps {
  text: string;
  path: string;
  linkLabel: string;
}

const CommonRoutingButton: React.FC<CommonRoutingButtonProps> = ({
  text,
  path,
  linkLabel,
}) => {
  return (
    <WideButton>
      <span>{text}</span>
      <Link href={path} className={styles.link}>
        {linkLabel}
      </Link>
    </WideButton>
  );
};

export default CommonRoutingButton;
