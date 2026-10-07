import { Link } from 'react-router';

import { buttonVariants } from '../../shared/ui/buttonVariants';
import { BuddysLogoIcon } from '../../shared/ui/icons';
import earthImage from './assets/earth.svg';

interface LandingPageProps {
  loginPath: string;
}

export const LandingPage = ({ loginPath }: LandingPageProps) => {
  return (
    <main className="flex min-h-dvh flex-col items-center px-4">
      <section className="flex max-w-50 flex-1 flex-col items-center justify-center gap-10">
        <img
          alt="지구본 위를 비행하는 비행기 일러스트"
          height={146}
          src={earthImage}
          width={120}
        />

        <div className="flex flex-col items-center gap-2 text-center">
          <BuddysLogoIcon
            aria-label="버디즈"
            className="text-gray-800"
            height={32}
            width={120}
          />
          <p className="text-body-r-14 text-gray-500">
            접수된 서류를 한눈에 확인하고
            <br />
            인증 요청을 관리하세요
          </p>
        </div>
      </section>

      <div className="flex w-full flex-col items-center gap-4 pb-8.5">
        <Link
          className={buttonVariants({ align: 'center', variant: 'primary' })}
          to={loginPath}
        >
          시작하기
        </Link>

        <div className="flex items-center justify-center gap-2">
          <p className="text-body-r-14 text-gray-500">이미 계정이 있나요?</p>
          <Link
            className="text-body-sb-14 focus-visible:outline-mint-300 rounded-sm text-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2"
            to={loginPath}
          >
            로그인
          </Link>
        </div>
      </div>
    </main>
  );
};
