import { Outlet } from 'react-router';

export const AppLayout = () => {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-[430px] min-w-[375px] bg-white">
      <Outlet />
    </div>
  );
};
