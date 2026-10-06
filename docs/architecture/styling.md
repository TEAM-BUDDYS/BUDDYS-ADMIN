# Styling

BUDDYS-ADMIN은 아직 스타일링 라이브러리를 도입하지 않았습니다. 디자인 토큰과 전역 스타일은 표준 CSS로 시작하고, 컴포넌트 전용 스타일은 소유 컴포넌트 가까이에 두는 방향을 사용합니다.

## Design Tokens

색상, 타이포그래피, 간격, radius와 shadow처럼 여러 화면에서 공유되는 디자인 값은 `src/shared/styles/tokens`에서 CSS custom property로 정의합니다.

현재 Client와 동일한 색상·타이포그래피 값을 다음 구조에서 관리합니다.

```text
src/shared/styles/
  fonts.css
  global.css
  index.css
  tokens/
    colors.css
    typography.css
```

- Client의 Tailwind `@theme` 문법은 사용하지 않고 Vite에서 바로 사용할 수 있는 `:root` CSS custom property로 정의합니다.
- token 이름과 값은 Client와 일치시켜 두 서비스에서 같은 디자인 언어를 사용합니다.
- primitive token은 원시 디자인 값을 표현합니다.
- semantic token은 배경, 텍스트, action, border와 status처럼 사용 목적을 표현합니다.
- 컴포넌트는 가능한 semantic token을 사용합니다.
- 동일한 의미의 값이 이미 token으로 존재하면 raw color 또는 임의의 수치를 반복하지 않습니다.
- Figma 변수나 스타일이 제공되면 이름과 역할을 현재 token 체계에 매핑하고, 원본의 시각적 의도를 보존합니다.
- spacing, radius와 shadow는 실제 디자인 값이 확정될 때 별도 token 파일로 추가합니다.

## Global Styles

- reset, body 기본값, font-face와 앱 전체 배경처럼 전역성이 분명한 스타일만 `src/shared/styles`에 둡니다.
- 전역 스타일 진입점은 `src/main.tsx`에서 한 번 import합니다.
- Pretendard Variable은 `src/shared/assets/fonts`에 두고 `fonts.css`에서 등록합니다.
- 특정 페이지나 컴포넌트의 레이아웃을 global selector에 넣지 않습니다.

## Component Styles

- 페이지 전용 스타일은 해당 `src/pages/{page}` 내부에 둡니다.
- 공통 UI 스타일은 해당 `src/shared/ui` 컴포넌트와 함께 둡니다.
- 컴포넌트 범위 격리가 필요하면 Vite가 지원하는 CSS Modules를 우선 검토합니다.
- inline style은 런타임 값이 필요한 경우에만 사용하고 정적 스타일의 기본 수단으로 사용하지 않습니다.
- 새 스타일링 라이브러리는 구체적인 요구와 유지보수 이점이 확인될 때만 도입합니다.

## Responsive And Accessibility

- 초기 Admin 화면은 모바일 뷰를 우선 구현하며 `AppLayout`에서 Client와 동일하게 화면 폭을 375px~430px로 제한하고 넓은 viewport에서는 중앙 정렬합니다.
- 데스크톱 화면을 확장할 때 전역 스타일이 아닌 `app/layouts` 경계에서 폭과 화면 골격을 조정합니다.
- 긴 이름, 파일명과 상태 문구가 레이아웃을 깨지 않는지 확인합니다.
- 색상만으로 상태를 구분하지 않습니다.
- focus indicator를 제거하지 않고 text와 interactive element의 대비를 확인합니다.
- `prefers-reduced-motion`을 무시하는 필수적이지 않은 animation을 추가하지 않습니다.
