import { Link } from 'react-router';

import { buttonVariants } from '../../shared/ui/buttonVariants';
import { WarningIcon } from '../../shared/ui/icons';

interface AccessDeniedPageProps {
  landingPath: string;
}

export const AccessDeniedPage = ({ landingPath }: AccessDeniedPageProps) => {
  return (
    <main className="flex min-h-dvh flex-col px-4 pb-8.5">
      <section className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="bg-error-50 text-error mb-6 flex size-20 items-center justify-center rounded-full">
          <WarningIcon height={44} width={44} />
        </div>

        <h1 className="text-title-b-22 text-gray-800">접근할 수 없어요</h1>
        <p className="text-body-m-15 mt-2 text-gray-500">
          관리자 권한이 있는 계정인지 확인한 뒤
          <br />
          다시 시도해 주세요.
        </p>
      </section>

      <Link
        className={buttonVariants({ align: 'center', variant: 'primary' })}
        to={landingPath}
      >
        처음으로 돌아가기
      </Link>
    </main>
  );
};
