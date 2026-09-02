# Feature Development

기능 규모에 따라 절차를 줄일 수 있지만 요구사항과 검증 없이 구현부터 시작하지 않습니다.

## Workflow

1. Jira 또는 요청에서 목표, 범위와 완료 기준을 확인합니다.
2. 현재 브랜치와 변경사항을 확인합니다.
3. 관련 문서와 변경 대상에 가까운 기존 코드를 확인합니다.
4. 코드 소유 위치를 `app`, `pages`, `shared` 중에서 결정합니다.
5. route, loading, empty, error, disabled, success와 완료 후 이동을 확인합니다.
6. Figma가 제공되면 대상 node의 디자인 context, token과 asset을 확인하고 현재 스타일 구조에 맞게 변환합니다.
7. API가 포함되면 endpoint, 인증, request, response와 오류 형식을 확인합니다.
8. 요청 범위 안에서 구현합니다.
9. 구조, 접근성, 오류 상태와 반응형을 검토합니다.
10. 변경 범위에 맞는 검증을 실행합니다.
11. 구현 내용, 검증 결과와 남은 위험을 정리합니다.

요구사항이 불명확하고 저장소나 제공 자료에서도 확인할 수 없으면 결과가 달라지는 핵심 사항만 질문합니다.

## Placement Decision

- 앱 전체 bootstrap, router, provider 또는 layout: `src/app`
- 한 페이지 영역에 속하는 UI, hook, API와 type: `src/pages/{page}`
- 여러 페이지에서 의미와 변경 이유가 같은 공통 기반: `src/shared`
- 현재 계층으로 표현하기 어려운 제품 기능 재사용: `architecture-review` 후 새 계층 검토

## Completion

- 완료 기준이 코드와 일치합니다.
- 요청 범위 밖 기능이나 의존성이 추가되지 않았습니다.
- 주요 UI와 API 상태가 처리되었습니다.
- 구조나 규칙 변경이 관련 문서에 반영되었습니다.
- 실행한 검증과 생략한 검증이 기록되었습니다.
