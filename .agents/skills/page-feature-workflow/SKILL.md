---
name: page-feature-workflow
description: BUDDYS-ADMIN의 Vite SPA 페이지, route, layout과 화면 흐름을 구현하거나 검토합니다. 새 페이지, 목록·상세 화면, route-local UI, loading·empty·error 상태와 navigation을 다루는 작업에 사용합니다.
---

# 페이지 기능 구현

## Read First

- `docs/architecture/app-structure.md`
- `docs/conventions/conventions.md`
- `docs/architecture/styling.md`
- 대상 페이지와 가까운 기존 코드

## Workflow

1. 사용자 진입 경로, route와 완료 후 navigation을 확인합니다.
2. route 화면은 `src/pages/{page}`가 소유하고 route 설정은 `src/app/router`가 소유합니다.
3. 페이지 전용 component, hook, API와 type은 소유 페이지 내부에 둡니다.
4. layout은 여러 route가 실제로 공유할 때 `src/app/layouts`에 둡니다.
5. loading, empty, error, disabled, submitting과 success 상태를 요구사항에 맞게 처리합니다.
6. 인증이 필요한 페이지는 각 화면에서 중복 처리하지 않고 router 또는 layout 경계를 검토합니다.
7. 접근성, 반응형, 긴 텍스트, 직접 URL 접근과 뒤로 가기 동작을 확인합니다.
8. `verify-frontend`로 마무리합니다.

## Placement

```text
src/app/router/
src/app/layouts/
src/pages/{page}/
  api/
  components/
  hooks/
  types/
```

위 하위 구조를 전부 채우지 않습니다. 작은 페이지는 한 파일로 시작하고 책임이 분리될 때 필요한 위치만 사용합니다.

현재 라우팅 라이브러리가 설치되어 있지 않다면 특정 router API를 가정하지 않습니다. 새 route 구현에 라우터 도입이 필요한 경우 요구 범위, 직접 URL 접근과 배포 fallback 조건을 함께 검토합니다.

## Requirement Check

새 route나 주요 화면에서는 다음 내용을 Jira와 제공 자료에서 확인합니다.

- route와 navigation
- loading, empty, error, disabled, submitting과 success 상태
- API와 사용자 상호작용
- 권한과 완료 후 이동
- 데스크톱과 좁은 viewport 조건
- destructive 또는 되돌리기 어려운 action의 확인 방식

필요한 내용이 없고 저장소에서도 확인할 수 없다면 결과를 바꾸는 핵심 사항만 질문합니다.

## Completion

- route와 layout이 의도대로 동작합니다.
- 페이지 전용 코드와 앱 전역 경계가 분리되어 있습니다.
- 주요 상태와 접근성이 확인되었습니다.
- 페이지와 shared 소유권이 명확합니다.
