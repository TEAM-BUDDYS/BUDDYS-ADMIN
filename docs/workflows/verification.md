# Verification

검증은 변경 범위와 실패 시 영향에 맞게 선택합니다.

## Matrix

| Change                     | Required verification                                            |
| -------------------------- | ---------------------------------------------------------------- |
| Markdown only              | 변경 파일 확인, diff 공백 검사, 링크와 경로 확인                 |
| Config or workflow         | 변경 파일 확인, 문법과 diff 공백 검사, 관련 build 또는 동작 확인 |
| TypeScript utility         | lint, TypeScript build, 필요한 단위 동작 확인                    |
| React component            | lint, TypeScript build, 주요 상태 확인                           |
| Route or page              | lint, build, 브라우저 확인                                       |
| Shared API or architecture | lint, build, 영향받는 화면 확인                                  |
| Dependency                 | frozen install, audit 검토, lint와 build                         |

## Commands

```bash
git status --short
git diff --check
git diff --cached --check
pnpm lint
pnpm exec tsc -b
pnpm build
```

`git diff --check`는 tracked working tree 변경, `git diff --cached --check`는 staged 변경을 검사합니다. untracked 파일은 두 명령에 포함되지 않으므로 `git status --short`로 확인하고, 최종 커밋 전에는 의도한 새 파일을 stage한 뒤 cached diff를 검사하거나 별도의 공백 검사를 실행합니다. 확인하지 않은 신규 파일이 남아 있으면 공백 검증을 통과했다고 보고하지 않습니다.

현재 `pnpm build`는 `tsc -b && vite build`를 실행합니다. 같은 변경에서 build를 실행했다면 별도의 TypeScript build를 중복 실행할 필요는 없지만, 빠른 정적 확인만 필요할 때 `pnpm exec tsc -b`를 사용할 수 있습니다.

## Browser Checklist

- Vite가 출력한 실제 URL에서 대상 화면이 열림
- 직접 URL 접근과 새로고침이 의도대로 동작함
- 콘솔과 네트워크에 예상하지 않은 오류가 없음
- 데스크톱과 좁은 viewport에서 업무 흐름이 깨지지 않음
- loading, empty, error, disabled, submitting과 success 상태가 의도대로 표시됨
- 긴 이름, 파일명과 동적 데이터가 영역을 넘치지 않음
- keyboard focus와 accessible name이 확인됨
- 승인과 반려 같은 mutation이 중복 실행되지 않음

## Structure And Hygiene

- 실제 token, credential 또는 개인 환경값이 커밋되지 않았는지 확인합니다.
- 임시 페이지, mock endpoint와 debug log가 남지 않았는지 확인합니다.
- 실제 파일이 생긴 폴더에 `.gitkeep`이 남지 않았는지 확인합니다.
- 생성된 `dist`와 `node_modules`가 추적되지 않는지 확인합니다.
- 사용자 변경사항을 검증 과정에서 되돌리지 않습니다.

## Reporting

```markdown
## Verification

- PASS:
- FAIL:
- Not run:
- Residual risk:
```

- 성공한 검사와 실패한 검사를 구분합니다.
- 실행하지 않은 검사를 통과했다고 적지 않습니다.
- 환경 문제로 실행하지 못했다면 원인과 잔여 위험을 남깁니다.
- 실패를 수정했다면 관련 검사를 다시 실행합니다.
