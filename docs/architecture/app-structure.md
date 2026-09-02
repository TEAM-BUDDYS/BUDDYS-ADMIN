# App Structure

BUDDYS-ADMIN은 Vite 기반 React SPA이며, 앱 전역 설정은 `src/app`, URL에 대응하는 화면과 페이지 전용 코드는 `src/pages`, 여러 페이지의 공통 기반은 `src/shared`에서 관리합니다.

## Current Structure

```text
src/
  main.tsx

  app/
    App.tsx
    layouts/
    providers/
    router/

  pages/
    login/
      api/
      components/
      hooks/
      types/

    document-reviews/
      api/
      components/
      hooks/
      types/

  shared/
    api/
    constants/
    hooks/
    styles/
      tokens/
    types/
    ui/
    utils/
```

현재 빈 디렉터리는 초기 구조를 Git에 유지하기 위해 `.gitkeep`을 포함합니다. 실제 파일을 추가할 때 같은 디렉터리의 `.gitkeep`은 제거합니다.

## Directory Responsibilities

### `src/main.tsx`

- React root를 생성하고 최상위 `App`을 마운트합니다.
- 앱 초기화에 필요한 전역 스타일 import 외에는 UI와 비즈니스 로직을 두지 않습니다.
- `src/app`을 주 진입 의존성으로 유지합니다.

### `src/app`

- `App.tsx`: 최상위 앱 컴포넌트
- `layouts`: 여러 route가 공유하는 관리자 화면 골격
- `providers`: 전역 Context와 라이브러리 Provider 조합
- `router`: route 정의, 보호 route와 navigation 설정

라우터나 전역 Provider 라이브러리가 아직 설치되지 않았다면 임의로 존재한다고 가정하지 않습니다. 기능 구현에 실제로 필요할 때 현재 요구사항과 `package.json`을 기준으로 도입 여부를 결정합니다.

`app`은 페이지를 조합하고 전역 경계를 연결하지만 페이지 전용 API, form 상태 또는 업무 로직을 소유하지 않습니다.

### `src/pages`

`pages/{page}`는 URL에 대응하는 페이지 컴포넌트와 그 페이지에서만 사용하는 코드를 함께 소유합니다.

```text
pages/{page}/
  api/          페이지 전용 API 요청
  components/   페이지 전용 UI
  hooks/        페이지 전용 상태와 동작
  types/        페이지 전용 타입
```

모든 하위 폴더를 매번 채울 필요는 없습니다. 작은 화면은 페이지 컴포넌트 하나로 시작하고 책임이 분리될 때만 가까운 하위 폴더를 사용합니다.

관리자 화면은 다음 책임 단위를 기준으로 시작합니다.

| Page area      | Proposed URL                          | Responsibility                  |
| -------------- | ------------------------------------- | ------------------------------- |
| 로그인         | `/login`                              | 관리자 인증 진입                |
| 서류 인증 목록 | `/document-reviews`                   | 상태 필터와 인증 요청 목록      |
| 서류 인증 상세 | `/document-reviews/:documentReviewId` | 제출 서류 확인과 승인·반려 처리 |

실제 route는 라우터를 도입할 때 요구사항과 함께 확정합니다. 상태별 목록은 별도 페이지를 만들지 않고 query parameter 또는 화면 상태로 표현하는 것을 우선 검토합니다.

### `src/shared`

- `api`: HTTP client, 인증 header, 공통 오류 변환처럼 여러 페이지가 사용하는 통신 기반
- `constants`: 여러 페이지에서 의미와 변경 이유가 같은 상수
- `hooks`: 제품 페이지 지식 없이 재사용되는 훅
- `styles`: 전역 스타일 진입점과 디자인 토큰
- `types`: API envelope, pagination처럼 페이지와 무관한 공통 타입
- `ui`: 버튼, 입력, 모달처럼 페이지 지식이 없는 재사용 UI
- `utils`: 제품 문맥 없이 입력과 출력으로 설명할 수 있는 순수 유틸리티

`shared`를 공용 보관함으로 사용하지 않습니다. 로그인 또는 서류 심사처럼 특정 업무 의미가 들어간 코드는 형태가 재사용 가능해 보여도 소유 페이지에 유지합니다.

## Routing

- route 정의는 `src/app/router`에서 관리합니다.
- route 화면은 `src/pages`에서 import합니다.
- route path 문자열을 여러 파일에 반복하지 않고 라우터를 도입할 때 한 위치에서 관리합니다.
- 인증이 필요한 화면은 각 페이지에서 guard를 반복하기보다 router 또는 layout 경계에서 한 번 처리합니다.
- 뒤로 가기, 직접 URL 접근과 새로고침 시 동작을 함께 확인합니다.
- 현재 라우팅 라이브러리가 없으므로 특정 라이브러리 API를 문서나 코드에 미리 확정하지 않습니다.

## Page State

조회와 mutation이 있는 페이지에서는 요구사항에 맞게 다음 상태를 구분합니다.

- initial 또는 idle
- loading
- empty
- error
- disabled 또는 submitting
- success

빈 데이터는 오류로 처리하지 않습니다. 사용자에게 보여줄 오류 상태와 개발자가 진단할 오류 정보를 구분합니다. 특정 데이터 fetching 또는 form 라이브러리는 실제로 도입된 뒤 그 패턴을 문서에 추가합니다.

## Commonization Rules

- 한 페이지 영역에서만 사용하는 코드는 해당 `pages/{page}` 안에 둡니다.
- 형태가 비슷하거나 미래에 재사용될 수 있다는 이유만으로 `shared`로 이동하지 않습니다.
- 여러 페이지에서 실제로 재사용되고 사용 의미와 변경 이유가 같을 때만 `shared` 이동을 검토합니다.
- 특정 업무 용어, API 타입 또는 권한 규칙이 포함된 코드는 공통 UI와 분리해 소유 페이지에 유지합니다.
- 외부 라이브러리 wrapper는 앱 전체에서 사용하는 기반 설정일 때만 `shared` 배치를 검토합니다.
- 현재 계층으로 표현하기 어려운 제품 기능 재사용이 반복될 때만 `features` 같은 새 계층을 제안하고, 도입 전 의존 방향과 이동 범위를 문서화합니다.

## Dependency Direction

허용 방향:

```text
main -> app -> pages -> shared
app -> shared
main -> shared/styles
```

금지 방향:

```text
pages -> app
shared -> pages
shared -> app
page-a -> page-b
```

페이지 간 코드 공유가 필요하면 해당 코드의 제품 의미를 먼저 확인합니다. 제품 문맥이 없는 공통 기반이면 `shared`로 이동하고, 제품 기능 자체가 공유되는 경우에는 새 기능 계층이 필요한지 `architecture-review`로 검토합니다.
