# Repo Structure

BUDDYS-ADMIN은 단일 Vite SPA로 시작합니다.

## Root Layout

```text
.agents/
.github/
.husky/
docs/
scripts/
src/
.gitignore
.prettierignore
.prettierrc
AGENTS.md
README.md
eslint.config.js
index.html
lint-staged.config.mjs
package.json
pnpm-lock.yaml
svgr.config.mjs
tsconfig.json
tsconfig.app.json
tsconfig.node.json
vercel.json
vite.config.ts
```

## Root Directories And Files

- `.agents`: AI agent가 사용하는 작업 유형별 Skill
- `.github`: CI, Vercel CD와 PR 알림 같은 GitHub Actions 자동화 설정
- `.husky`: Git hook에서 실행할 자동화 스크립트
- `docs`: 프로젝트 구조, 컨벤션과 작업 절차 문서
- `scripts`: SVG 아이콘처럼 반복 생성하는 코드 자산의 자동화 스크립트
- `src`: React 애플리케이션 코드
- `.gitignore`: 생성물, 설치 결과와 로컬 전용 파일 제외 규칙
- `.prettierignore`: Prettier 포맷 대상 제외 규칙
- `.prettierrc`: Prettier 코드 포맷과 Tailwind utility 정렬 설정
- `AGENTS.md`: AI agent의 저장소 진입점
- `README.md`: 사람을 위한 프로젝트 소개와 빠른 시작
- `eslint.config.js`: TypeScript와 React 정적 검사 설정
- `index.html`: Vite HTML 진입점
- `lint-staged.config.mjs`: staged 파일에 적용할 lint와 format 명령
- `package.json`: 스크립트와 직접 의존성의 원본
- `pnpm-lock.yaml`: pnpm이 해석한 의존성 버전
- `svgr.config.mjs`: 원본 SVG를 React 아이콘 컴포넌트로 변환하는 SVGR 설정
- `tsconfig*.json`: 앱, Vite 설정과 project reference를 위한 TypeScript 설정
- `vercel.json`: Vercel에서 SPA route의 직접 접근과 새로고침을 지원하는 rewrite 설정
- `vite.config.ts`: React와 Tailwind를 포함한 Vite 빌드·플러그인 설정

## Rules

- 모노레포 구조는 현재 사용하지 않습니다.
- 앱 코드는 `src` 안에 둡니다.
- 프로젝트 구조와 팀 규칙 문서는 `docs`에 둡니다.
- Agent 실행 절차는 `.agents/skills`에 둡니다.
- GitHub Actions workflow는 `.github/workflows`에 두고 webhook과 credential은 코드가 아닌 GitHub Actions secret으로 관리합니다.
- Vercel의 `.vercel`과 `.env.local`은 로컬 생성 파일로 취급해 커밋하지 않습니다.
- Vercel SPA rewrite는 모든 route 요청을 `index.html`로 연결하고 브라우저 router가 최종 화면을 결정하도록 합니다.
- Git hook은 `.husky`에 두고 staged 파일 검사는 `lint-staged.config.mjs`에서 관리합니다.
- `AGENTS.md`는 세부 규칙을 복사하지 않고 Source of Truth를 연결합니다.
- 새 루트 디렉터리는 역할과 실제 사용처가 명확할 때만 추가합니다.
- URL로 직접 접근하거나 원본 그대로 제공해야 하는 정적 파일이 생길 때만 `public`을 추가합니다.
- 코드에서 import하는 이미지, 아이콘과 폰트는 소유 페이지 가까이에 두고, 여러 페이지에서 재사용될 때만 `src/shared` 아래의 자산 경계를 검토합니다.
- 공통 아이콘의 원본 SVG는 `src/shared/assets/icons`에 두고 `pnpm icons:generate`로 `src/shared/ui/icons`의 React 컴포넌트와 export를 생성합니다. 생성된 아이콘 컴포넌트는 직접 수정하지 않습니다.
- 생성된 `dist`와 설치된 `node_modules`는 커밋하지 않습니다.
