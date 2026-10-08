# Dependency Maintenance

의존성 변경은 설치 성공뿐 아니라 호환성, lockfile과 실제 빌드 경로를 함께 확인합니다.

## Source Of Truth

- 직접 의존성과 허용 버전 범위는 `package.json`에서 관리합니다.
- 실제 해상도 결과는 `pnpm-lock.yaml`로 고정합니다.
- lockfile을 수동으로 편집하지 않습니다.
- 현재 저장소는 pnpm workspace를 사용하지 않습니다.

## Add Or Remove

```bash
pnpm add <package>
pnpm add -D <package>
pnpm remove <package>
```

- 현재 코드로 해결할 수 있는 문제에 습관적으로 새 라이브러리를 추가하지 않습니다.
- 새 의존성이 필요한 경우 현재 React, TypeScript와 Vite 버전의 peer dependency 호환성을 확인합니다.
- 라우터, API client, 서버 상태, form 또는 스타일링처럼 프로젝트 전반에 영향을 주는 도구를 도입하면 관련 architecture와 workflow 문서도 갱신합니다.
- 사용하지 않는 의존성을 남기지 않습니다.

## Security Update

1. `pnpm audit`으로 현재 lockfile의 알려진 취약점을 확인합니다.
2. 공식 보안 권고와 patched version을 확인합니다.
3. 직접 의존성 업데이트가 전이 의존성 문제를 해결하는지 먼저 검토합니다.
4. 불필요한 major 업데이트를 보안 수정에 섞지 않습니다.
5. `pnpm install`로 lockfile을 생성한 뒤 audit과 관련 검증을 반복합니다.

## Verification

변경 범위에 따라 아래 검증을 선택하고 실행하지 못한 항목은 이유를 기록합니다.

```bash
pnpm install --frozen-lockfile
pnpm audit
pnpm lint
pnpm exec tsc -b
pnpm build
```

- `package.json`과 `pnpm-lock.yaml` 변경이 의도한 패키지 범위에 한정되는지 확인합니다.
- build tool 또는 production dependency 변경은 `pnpm build`와 `pnpm preview` 기반 smoke test를 검토합니다.
- 취약점을 허용하거나 보류했다면 이유와 영향 범위를 PR에 남깁니다.
