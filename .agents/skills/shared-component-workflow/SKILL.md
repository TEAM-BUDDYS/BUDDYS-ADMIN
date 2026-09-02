---
name: shared-component-workflow
description: BUDDYS-ADMIN에서 여러 페이지가 함께 사용하는 UI, hook 또는 디자인 토큰을 구현하거나 검토합니다. src/shared/ui 추가, 페이지 컴포넌트의 공통화, 공통 컴포넌트 API, 스타일과 접근성 경계를 판단할 때 사용합니다.
---

# 공통 UI와 디자인 기반 구현

## Read First

- `docs/architecture/app-structure.md`
- `docs/architecture/styling.md`
- `docs/conventions/conventions.md`
- 가까운 page 또는 shared 구현

구조나 공통화 판단이 필요한 경우 `architecture-review`를 함께 적용합니다.

## Entry Decision

공통화 판단은 `docs/architecture/app-structure.md`의 `Commonization Rules`를 따릅니다.

여러 페이지에서 실제로 사용되고 사용 의미와 변경 이유가 같은지 확인한 뒤, 로그인이나 서류 심사 같은 특정 업무 지식 없이 props와 UI 책임을 설명할 수 있는지 추가로 확인합니다. 조건이 충족되지 않으면 소유 페이지 내부에 유지합니다.

## Placement

```text
src/shared/ui/
src/shared/hooks/
src/shared/styles/
  tokens/
```

- 버튼, 입력, modal과 status tag처럼 페이지 지식이 없는 UI는 `shared/ui`를 검토합니다.
- 앱 shell과 관리자 navigation처럼 route 구조를 담당하는 layout은 `app/layouts`를 사용합니다.
- 색상, typography, spacing, radius와 shadow는 `shared/styles/tokens`를 사용합니다.
- 단일 페이지 전용 section은 shared에 두지 않습니다.

## Workflow

1. 기존 사용처와 중복 구현을 확인합니다.
2. 공통화 근거와 컴포넌트의 단일 책임을 확인합니다.
3. 최소 props를 정의하고 특정 page 이름, API 타입과 권한 규칙이 스며들지 않게 합니다.
4. semantic element, keyboard, focus와 accessible name을 확인합니다.
5. loading, disabled와 error 중 컴포넌트가 소유해야 하는 상태만 처리합니다.
6. 기존 token을 우선 사용하고 새 token은 반복 가능한 의미가 있을 때 추가합니다.
7. 현재 스타일링 도구를 확인하고 설치되지 않은 스타일링 또는 UI 라이브러리를 가정하지 않습니다.
8. 사용처를 함께 갱신하고 불필요한 중복 코드를 정리합니다.
9. `verify-frontend`로 변경 범위와 화면 동작을 검증합니다.

## Rules

- 미래의 재사용 가능성만으로 공통화하지 않습니다.
- 하나의 사용처를 위해 과도한 variant나 abstraction을 추가하지 않습니다.
- 디자인 token과 component API에 특정 페이지의 업무 상태를 고정하지 않습니다.
- 디자인 시스템 package가 도입되기 전에는 이 앱 내부 shared 자원으로 취급합니다.

## Completion

- 공통화 근거와 소유 위치가 명확합니다.
- page 또는 app 의존이 없습니다.
- 주요 상태와 접근성이 검증되었습니다.
