import type { ReactNode } from 'react';

import styles from './AppLayout.module.css';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return <div className={styles.container}>{children}</div>;
};
