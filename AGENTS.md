# BUDDYS-ADMIN Agent Guide

이 문서는 BUDDYS-ADMIN에서 작업하는 AI agent의 진입점입니다. 상세 규칙을 중복하지 않고 작업에 필요한 원본 문서와 Skill을 연결합니다.

## Repository

- Product: BUDDYS 운영자가 서류 인증을 조회하고 승인 또는 반려하는 관리자 웹
- Stack: Vite, React, TypeScript
- Package manager: pnpm
- Jira key: `BDYFE-*`
- Base branch: `develop`
- Application code: `src`
- Current architecture: `main -> app -> pages -> shared`

라우터, API 클라이언트, 서버 상태 라이브러리와 스타일링 라이브러리는 아직 확정되지 않았습니다. `package.json`과 현재 코드를 확인하지 않고 특정 라이브러리나 패턴이 이미 존재한다고 가정하지 않습니다.

## Working Rule

- 현재 저장소 맥락 확인이 필요한 작업은 `repo-orientation`으로 시작합니다.
- 작업 유형이 분명하면 해당 구현 Skill을 직접 사용하고, 여러 유형이 섞였거나 범위 판단이 필요할 때만 `frontend-task-workflow`을 사용합니다.
- 구조 영향이 있으면 `architecture-review`, 구현이 끝나면 `verify-frontend`를 적용합니다.
- 계획, 분석 또는 리뷰 요청에서는 파일을 수정하지 않습니다. 작업 규모에 맞는 Skill과 검증만 선택합니다.

## Source Of Truth

- 문서 인덱스: `docs/index.md`
- 저장소 구조: `docs/architecture/repo-structure.md`
- 앱 구조와 의존 방향: `docs/architecture/app-structure.md`
- 스타일과 디자인 토큰: `docs/architecture/styling.md`
- 코딩 컨벤션: `docs/conventions/conventions.md`
- Git과 Jira 규칙: `docs/conventions/git.md`
- 개발 작업 절차: `docs/workflows/*`
- Agent Harness 운영: `docs/agent/*`

문서와 실제 코드가 다르면 현재 코드를 먼저 확인하고, 구조나 팀 규칙이 바뀐 작업이라면 관련 문서도 함께 갱신합니다.

## Skill Routing

| Task                           | Skill                       | Supporting document                     |
| ------------------------------ | --------------------------- | --------------------------------------- |
| 저장소 파악                    | `repo-orientation`          | `docs/index.md`                         |
| 프론트엔드 작업 분류와 진행    | `frontend-task-workflow`    | `docs/workflows/feature-development.md` |
| 페이지, 라우트 또는 화면 흐름  | `page-feature-workflow`     | `docs/architecture/app-structure.md`    |
| 공통 UI 또는 디자인 토큰       | `shared-component-workflow` | `docs/architecture/styling.md`          |
| API 요청과 UI 상태 연결        | `api-integration-workflow`  | `docs/architecture/app-structure.md`    |
| 구조와 의존 방향 검토          | `architecture-review`       | `docs/architecture/app-structure.md`    |
| 구현 검증                      | `verify-frontend`           | `docs/workflows/verification.md`        |
| 문서, 설정 또는 GitHub Actions | `verify-frontend`           | 가까운 Source of Truth와 기존 파일      |

## Architecture Principles

- `src/main.tsx`는 앱을 마운트하고, `src/app`은 전역 설정과 조합을 담당합니다.
- `src/pages/{page}`는 URL에 대응하는 화면과 페이지 전용 코드를 소유합니다.
- `src/shared`에는 여러 페이지에서 같은 의미로 재사용되고 특정 페이지 지식이 없는 코드만 둡니다.
- 의존 방향은 `main -> app -> pages -> shared`이며 페이지 간 직접 import와 역방향 import를 만들지 않습니다.
- 제품 기능 재사용이 실제로 생겼을 때만 `features` 같은 새 계층을 검토합니다.

세부 기준은 `docs/architecture/app-structure.md`를 따릅니다.

브라우저 번들에 비밀값을 두지 않습니다. `VITE_` prefix 환경변수는 클라이언트에 노출될 수 있다고 간주합니다.

## Verification

`verify-frontend`와 `docs/workflows/verification.md`에 따라 변경 범위와 위험에 맞는 검증을 선택합니다. 실행하지 못한 검증은 이유와 잔여 위험을 보고합니다.
