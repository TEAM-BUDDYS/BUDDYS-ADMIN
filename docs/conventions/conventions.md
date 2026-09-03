# Coding Convention

이 문서는 현재 Vite와 TypeScript 설정, 기존 코드와 합의된 `app/pages/shared` 구조를 기준으로 합니다. 코드 품질은 ESLint, 형식은 Prettier 설정을 원본으로 사용합니다.

## Formatting And Linting

- ESLint는 React Hooks, React Refresh, TypeScript, import 정렬과 미사용 import 규칙을 검사합니다.
- Prettier는 semicolon, single quote, 2칸 들여쓰기, trailing comma와 80자 print width를 적용합니다.
- ESLint와 Prettier의 규칙 충돌은 `eslint-config-prettier`로 방지합니다.
- 전체 검사는 `pnpm lint`와 `pnpm format:check`, 자동 수정은 `pnpm lint:fix`와 `pnpm format`을 사용합니다.
- pre-commit hook은 staged JavaScript·TypeScript 파일에 ESLint와 Prettier, JSON·CSS·HTML·Markdown·YAML 파일에 Prettier를 적용합니다.
- 별도 스키마로 검증하는 `.agents`와 패키지 매니저가 생성하는 `pnpm-lock.yaml`은 Prettier 대상에서 제외합니다.

## File And Folder

| Target               | Convention                     | Example                         |
| -------------------- | ------------------------------ | ------------------------------- |
| Folder               | `kebab-case`                   | `document-reviews/`             |
| React component file | `PascalCase.tsx`               | `DocumentReviewItem.tsx`        |
| Hook                 | `useCamelCase.ts`              | `useDocumentReviews.ts`         |
| API                  | `camelCase.api.ts`             | `documentReview.api.ts`         |
| Type                 | `camelCase.types.ts`           | `documentReview.types.ts`       |
| Utility              | `camelCase.ts`                 | `formatDate.ts`                 |
| CSS Module           | component name + `.module.css` | `DocumentReviewItem.module.css` |

- React 컴포넌트와 타입 이름은 `PascalCase`를 사용합니다.
- 기존 Vite 진입 파일인 `main.tsx`와 `App.tsx`의 이름은 유지합니다.
- 파일은 역할이 하나일 때 해당 역할이 드러나는 이름을 사용합니다.
- 불필요한 `index.ts` barrel file을 만들지 않습니다. 공개 경계를 명확히 줄이는 실제 이점이 있을 때만 추가합니다.

## Component

- 컴포넌트는 한 가지 화면 책임을 갖도록 유지하고 복잡해질 때만 분리합니다.
- 재사용 컴포넌트는 named export를 우선합니다.
- 앱 또는 route의 단일 진입 컴포넌트에는 default export를 허용합니다.
- 자식 요소가 없으면 self-closing 형태를 사용합니다.
- 의미 없는 wrapper `div`를 피하고 가능한 semantic element 또는 Fragment를 사용합니다.
- 표시 컴포넌트와 API mutation, form orchestration 같은 업무 로직이 함께 커지면 페이지 내부에서 책임을 분리합니다.

```tsx
interface DocumentReviewItemProps {
  applicantName: string;
  status: string;
}

export const DocumentReviewItem = ({
  applicantName,
  status,
}: DocumentReviewItemProps) => {
  return (
    <article>
      <h2>{applicantName}</h2>
      <span>{status}</span>
    </article>
  );
};
```

## Type

- 타입 이름은 `PascalCase`를 사용합니다.
- Props 타입은 `Props` suffix를 사용합니다.
- 객체 형태의 확장 가능한 계약은 `interface`를 우선 검토합니다.
- union, tuple, literal 또는 mapped type처럼 `type`이 더 적합한 경우에는 `type`을 사용합니다.
- 페이지 전용 타입은 `src/pages/{page}/types`에 둡니다.
- API envelope, pagination처럼 여러 페이지에서 같은 의미로 사용하는 타입만 `src/shared/types`에 둡니다.
- API 응답 타입과 화면에서 사용하는 model을 항상 같은 타입으로 합치지 않습니다.

## Variable And Constant

- 재할당이 필요 없으면 `const`를 사용하고 필요한 경우에만 `let`을 사용합니다.
- `var`는 사용하지 않습니다.
- 고정 상수는 `UPPER_SNAKE_CASE`를 사용합니다.
- 줄임말보다 의미가 드러나는 이름을 사용합니다.
- 복수 데이터는 복수형 이름을 사용합니다.
- Boolean 값은 `is`, `has`, `can`, `should` prefix를 권장합니다.

## Function

- 함수명은 동작과 대상을 함께 드러냅니다.
- React event handler에는 `handle` prefix를 사용합니다.
- 외부에서 callback으로 전달하는 props에는 `on` prefix를 사용합니다.
- 유틸 함수는 반환값이나 변환 결과가 드러나는 이름을 사용합니다.
- 복잡한 조건은 의미 있는 변수나 함수로 분리합니다.

## Import

- 현재 `@/*` alias가 설정되어 있지 않으므로 상대 경로 import를 사용합니다.
- alias를 도입하려면 Vite와 TypeScript 설정을 함께 변경하고 관련 문서도 갱신합니다.
- import는 외부 패키지, 앱 내부 모듈, 스타일 순서로 읽기 쉽게 정리합니다.
- 페이지 간 직접 import를 만들지 않습니다.
- type-only import가 명확한 경우 `import type`을 사용합니다.

## State And Logic

- page 컴포넌트 안에 복잡한 form, API와 상태 변환 로직을 오래 두지 않습니다.
- 해당 페이지에서만 사용하는 로직은 `pages/{page}/hooks`, API는 `pages/{page}/api`에 둡니다.
- 여러 페이지에서 실제로 재사용되는 기반만 `shared` 이동을 검토합니다.
- 서버 상태 또는 전역 상태 라이브러리가 설치되어 있다고 가정하지 않습니다.
- 파생할 수 있는 값을 중복 state로 저장하지 않습니다.
- `useEffect`는 외부 시스템과 동기화할 때 사용하고 단순한 값 계산에 사용하지 않습니다.

## Error And User Feedback

- 오류를 조용히 삼키지 않습니다.
- 사용자에게 보여줄 메시지와 개발자가 진단할 오류 정보를 구분합니다.
- 제출 중 중복 요청이 발생하지 않도록 interactive state를 관리합니다.
- 승인 또는 반려처럼 결과가 되돌리기 어려운 작업은 명확한 대상과 확인 단계를 검토합니다.

## Accessibility

- 텍스트가 없는 버튼에는 `aria-label`을 제공합니다.
- 입력 요소는 `label`과 연결합니다.
- heading level은 논리적인 순서를 유지합니다.
- keyboard만으로 주요 업무 흐름을 수행할 수 있어야 합니다.
- focus indicator를 임의로 제거하지 않습니다.
- 상태를 색상 하나로만 표현하지 않습니다.
