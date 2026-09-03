# Repo Structure

BUDDYS-ADMIN은 단일 Vite SPA로 시작합니다.

## Root Layout

```text
.agents/
.github/
docs/
src/
.gitignore
AGENTS.md
README.md
eslint.config.js
index.html
package.json
pnpm-lock.yaml
tsconfig.json
tsconfig.app.json
tsconfig.node.json
vite.config.ts
```

## Root Directories And Files

- `.agents`: AI agent가 사용하는 작업 유형별 Skill
- `.github`: PR 알림 같은 GitHub Actions 자동화 설정
- `docs`: 프로젝트 구조, 컨벤션과 작업 절차 문서
- `src`: React 애플리케이션 코드
- `.gitignore`: 생성물, 설치 결과와 로컬 전용 파일 제외 규칙
- `AGENTS.md`: AI agent의 저장소 진입점
- `README.md`: 사람을 위한 프로젝트 소개와 빠른 시작
- `eslint.config.js`: TypeScript와 React 정적 검사 설정
- `index.html`: Vite HTML 진입점
- `package.json`: 스크립트와 직접 의존성의 원본
- `pnpm-lock.yaml`: pnpm이 해석한 의존성 버전
- `tsconfig*.json`: 앱, Vite 설정과 project reference를 위한 TypeScript 설정
- `vite.config.ts`: Vite 빌드와 플러그인 설정

## Rules

- 모노레포 구조는 현재 사용하지 않습니다.
- 앱 코드는 `src` 안에 둡니다.
- 프로젝트 구조와 팀 규칙 문서는 `docs`에 둡니다.
- Agent 실행 절차는 `.agents/skills`에 둡니다.
- GitHub Actions workflow는 `.github/workflows`에 두고 webhook과 credential은 코드가 아닌 GitHub Actions secret으로 관리합니다.
- `AGENTS.md`는 세부 규칙을 복사하지 않고 Source of Truth를 연결합니다.
- 새 루트 디렉터리는 역할과 실제 사용처가 명확할 때만 추가합니다.
- URL로 직접 접근하거나 원본 그대로 제공해야 하는 정적 파일이 생길 때만 `public`을 추가합니다.
- 코드에서 import하는 이미지, 아이콘과 폰트는 소유 페이지 가까이에 두고, 여러 페이지에서 재사용될 때만 `src/shared` 아래의 자산 경계를 검토합니다.
- 생성된 `dist`와 설치된 `node_modules`는 커밋하지 않습니다.
