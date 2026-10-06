import type { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-[430px] min-w-[375px] bg-white">
      {children}
    </div>
  );
};
