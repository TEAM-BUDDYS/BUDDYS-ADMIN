# Local Development

## Requirements

- Node.js 22.13 이상 23 미만 또는 24 이상
- pnpm 10.15.1

Node.js와 pnpm 지원 범위는 `package.json`의 `engines`와 `packageManager`를 따릅니다.

## Install

```bash
pnpm install
```

CI 또는 lockfile 재현성을 확인할 때는 다음을 사용합니다.

```bash
pnpm install --frozen-lockfile
```

## Run

```bash
pnpm dev
```

Vite가 터미널에 출력하는 로컬 URL에서 애플리케이션을 확인합니다. 이미 사용 중인 포트가 있으면 Vite가 선택한 실제 URL을 사용합니다.

## Check

```bash
pnpm format:check
pnpm lint
pnpm exec tsc -b
pnpm build
```

`pnpm build`는 현재 `tsc -b && vite build`를 실행하므로 전체 빌드 검증에는 TypeScript 검사가 포함됩니다. 명령은 변경 범위에 맞게 선택하고 자세한 기준은 [Verification](./verification.md)을 따릅니다.

## Git Hooks

`pnpm install`은 `prepare` script를 통해 Husky Git hook을 설정합니다. commit 전에는 lint-staged가 staged 파일에 필요한 ESLint와 Prettier 수정을 적용합니다.

훅을 직접 확인할 때는 의도한 파일을 stage한 뒤 다음 명령을 사용합니다.

```bash
pnpm lint-staged
```

## Preview

프로덕션 빌드 결과를 로컬에서 확인할 때 사용합니다.

```bash
pnpm preview
```

먼저 `pnpm build`가 성공해야 합니다.

## Environment Variables

- 실제 비밀값이 들어간 환경변수 파일을 커밋하지 않습니다.
- 로컬 값은 `.env.local` 사용을 우선합니다.
- 팀에 필요한 변수 이름은 실제 값 없이 `.env.example` 또는 관련 문서에 기록합니다.
- `VITE_` prefix가 붙은 변수는 클라이언트 번들에서 접근할 수 있으므로 공개 가능한 값만 사용합니다.
- 관리자 비밀키, 서버 전용 token과 credential을 이 SPA에 넣지 않습니다.

라우터, API base URL 또는 인증 방식이 확정되면 실제 변수 이름과 역할만 이 문서에 추가합니다.
