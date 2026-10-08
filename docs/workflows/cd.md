# Continuous Deployment

BUDDYS-ADMIN은 Vercel Git 연동 대신 GitHub Actions와 Vercel CLI를 사용해 배포합니다. 배포는 별도로 시작하지 않고 `CI` workflow의 `Quality Check`가 성공한 push에서만 실행합니다.

## Deployment Policy

| Git event                 | Deployment              |
| ------------------------- | ----------------------- |
| `main`, `develop` 대상 PR | 배포하지 않고 CI만 실행 |
| `develop` push            | Vercel Preview 배포     |
| `main` push               | Vercel Production 배포  |
| CI 실패 또는 취소         | 배포하지 않음           |

`develop`은 통합 검증용 Preview 환경이고 `main`은 운영 환경입니다. Vercel 프로젝트에서 Git 저장소 자동 배포는 연결하지 않습니다. Git 연동을 함께 활성화하면 GitHub Actions 배포와 중복될 수 있습니다.

## Workflow

`.github/workflows/ci.yml`의 `deploy` job이 품질 검사를 통과한 push에서 `.github/workflows/cd.yml`을 호출합니다. `CD`는 호출한 workflow와 같은 commit을 checkout하고 다음 순서로 실행합니다.

1. pnpm과 Node.js 22를 설정합니다.
2. lockfile을 기준으로 의존성을 설치합니다.
3. 고정된 Vercel CLI 버전을 설치합니다.
4. 배포 대상의 Vercel 설정과 환경변수를 가져옵니다.
5. Vercel Build Output을 생성합니다.
6. Preview 또는 Production으로 prebuilt 결과를 배포합니다.

같은 환경의 이전 배포가 실행 중이면 최신 commit 배포를 우선하기 위해 취소합니다.

## GitHub Actions Secrets

Repository의 `Settings > Secrets and variables > Actions`에 다음 secret이 필요합니다.

| Secret name         | Source                                      |
| ------------------- | ------------------------------------------- |
| `VERCEL_TOKEN`      | Vercel Account Settings에서 만든 배포 token |
| `VERCEL_ORG_ID`     | `.vercel/project.json`의 `orgId`            |
| `VERCEL_PROJECT_ID` | `.vercel/project.json`의 `projectId`        |

실제 값은 코드, 문서, `.env` 또는 workflow에 작성하지 않습니다. 배포 token을 교체하거나 만료 기간을 갱신하면 GitHub의 `VERCEL_TOKEN`도 함께 교체합니다.

## Local Vercel Files

`vercel link`가 만드는 `.vercel`과 Vercel CLI가 만드는 `.env.local`은 로컬 전용 파일입니다. 두 경로는 `.gitignore`로 제외하며 저장소에 추가하지 않습니다. 팀에서 공유할 환경변수 이름이 생기면 값 없이 `.env.example`에 기록합니다.

## Verification

- `develop` 머지 후 `CI / Quality Check`와 `CI / Deploy to Vercel / Preview Deployment`가 순서대로 성공하는지 확인합니다.
- Preview 배포 URL에서 화면과 브라우저 콘솔을 확인합니다.
- `main` 머지 후 Production Deployment와 운영 URL을 확인합니다.
- 실패 시 GitHub Actions 로그에서 실패한 Vercel CLI 단계와 Vercel Dashboard의 배포 로그를 함께 확인합니다.
