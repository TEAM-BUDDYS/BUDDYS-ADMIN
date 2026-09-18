# Continuous Integration

GitHub Actions의 `CI` workflow는 `main`과 `develop`을 대상으로 하는 pull request와 두 브랜치의 push에서 실행합니다.

`Quality Check` job은 다음 순서로 프로젝트를 검사합니다.

1. pnpm과 Node.js 22를 설정합니다.
2. `pnpm install --frozen-lockfile`로 lockfile과 일치하는 의존성을 설치합니다.
3. `pnpm format:check`로 포맷을 검사합니다.
4. `pnpm lint`로 ESLint 검사를 실행합니다.
5. `pnpm build`로 TypeScript와 Vite 프로덕션 빌드를 검사합니다.
6. Vite Preview 서버를 실행하고 HTTP 응답을 확인합니다.

CI에서는 `HUSKY=0`을 사용해 로컬 개발용 Git Hook 설치를 생략합니다. GitHub branch protection 또는 ruleset에서는 `Quality Check`를 필수 검사로 등록합니다.

pull request에서는 `Quality Check`만 실행합니다. `main` 또는 `develop` push에서는 `Quality Check`가 성공한 뒤 재사용 가능한 `CD` workflow를 호출합니다. 배포 정책과 필요한 secret은 [Continuous Deployment](./cd.md)를 따릅니다.
