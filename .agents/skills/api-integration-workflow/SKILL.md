---
name: api-integration-workflow
description: BUDDYS-ADMIN에서 브라우저 API 요청, 응답 타입, 인증, 오류와 UI 상태를 연결합니다. 새 endpoint 연동, 조회 또는 mutation, API 코드 위치 결정과 네트워크 오류 처리를 구현하거나 검토할 때 사용합니다.
---

# API 연동

현재 저장소에서 API client나 서버 상태 라이브러리가 확정되지 않았다면 특정 도구를 이미 사용 중이라고 가정하거나 구체적인 필요 없이 새 의존성을 추가하지 않습니다.

## Read First

- `docs/architecture/app-structure.md`
- `docs/workflows/local-development.md`
- 관련 페이지와 기존 API 코드
- 사용자에게 제공된 API 명세

## Workflow

1. endpoint, method, request, response, 인증과 오류 형식을 확인합니다.
2. 이 저장소가 브라우저에서 실행되는 Vite SPA임을 기준으로 보안 경계를 확인합니다.
3. 한 페이지 영역의 요청은 `src/pages/{page}/api`를 우선합니다.
4. 여러 페이지가 사용하는 HTTP client, header와 공통 오류 변환만 `src/shared/api`에 둡니다.
5. transport 타입과 화면 model을 무조건 하나로 합치지 않습니다.
6. loading, empty, error, retry, disabled, submitting과 success 상태를 화면과 연결합니다.
7. mutation 이후 목록과 상세 데이터의 일관성을 유지할 재조회 또는 cache 갱신 동작을 명시합니다.
8. 인증 token, 사용자 정보와 오류 payload를 로그에 노출하지 않습니다.
9. `verify-frontend`로 관련 정적 검사와 화면 상태를 확인합니다.

## Browser Boundary

- `VITE_` 환경변수는 브라우저 번들에서 접근할 수 있으므로 공개 가능한 API base URL 같은 값에만 사용합니다.
- 관리자 비밀키, 서버 전용 token과 credential을 이 저장소에 넣지 않습니다.
- 브라우저에서 안전하게 실행할 수 없는 요청은 이 SPA에 임시 우회로를 만들지 않고 별도 서버 경계가 필요한지 보고합니다.
- 인증 저장 방식과 refresh 정책은 기존 백엔드 계약 또는 확정된 요구사항을 확인하고 임의로 정하지 않습니다.

## Error Handling

- 사용자에게 보여줄 메시지와 개발자가 진단할 정보를 구분합니다.
- 네트워크, 인증, validation과 서버 오류를 구분할 수 있으면 구분합니다.
- 오류를 조용히 삼키지 않습니다.
- 정상 응답의 빈 데이터는 오류가 아니라 명시적인 empty 상태로 처리합니다.
- 오류 관측 도구가 있더라도 사용자 상태 처리를 대체하지 않습니다.

## Completion

- request, response와 화면 model의 책임이 명확합니다.
- UI 상태가 요청 결과와 연결됩니다.
- API 코드가 올바른 page 또는 shared 경계에 있습니다.
- 민감한 값이 코드, 로그 또는 클라이언트 번들에 노출되지 않습니다.
- mutation 이후 관련 화면의 데이터 일관성이 유지됩니다.
