import { Button } from '../../shared/ui/Button';
import { KakaoIcon } from '../../shared/ui/icons';
import documentImage from './assets/document.svg';

export const LoginPage = () => {
  return (
    <main className="flex min-h-dvh flex-col items-center px-4">
      <section className="flex max-w-50 flex-1 flex-col items-center justify-center gap-10">
        <img
          alt="인증 문서 일러스트"
          height={116}
          src={documentImage}
          width={100}
        />

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-title-b-22 text-gray-800">간편하게 시작하기</h1>
          <p className="text-body-m-15 text-gray-500">
            카카오 계정으로 로그인하고
            <br />
            인증 요청을 관리하세요
          </p>
        </div>
      </section>

      <div className="flex h-[150px] w-full items-end pb-8.5">
        <Button
          align="center"
          className="bg-[#fae100]"
          icon={<KakaoIcon />}
          iconSize="lg"
          variant="login"
        >
          카카오로 로그인
        </Button>
      </div>
    </main>
  );
};
