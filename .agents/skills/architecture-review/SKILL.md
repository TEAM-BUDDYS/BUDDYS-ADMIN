---
name: architecture-review
description: BUDDYS-ADMIN의 파일 위치, app/pages/shared 소유권, 페이지 공통화와 의존 방향을 검토합니다. 폴더 구조 변경, 새 계층이나 추상화, 공통 코드 이동, 코드 리뷰 또는 리팩터링 판단에 사용합니다.
---

# 아키텍처 리뷰

## Source Of Truth

- `docs/architecture/repo-structure.md`
- `docs/architecture/app-structure.md`
- `docs/architecture/styling.md`
- 변경 대상과 가까운 기존 코드

## Review Order

1. 기능을 소유하는 page 또는 app 경계가 명확한지 확인합니다.
2. `src/main.tsx`와 `src/app`에 페이지 전용 로직이 들어갔는지 확인합니다.
3. 페이지가 다른 페이지를 직접 import하는지 확인합니다.
4. `shared`가 특정 page나 관리자 업무에 종속됐는지 확인합니다.
5. 실제 재사용 없이 공통화된 코드가 있는지 확인합니다.
6. 새 계층이나 abstraction이 복잡도를 실제로 줄이는지 확인합니다.
7. 라우터, 상태, API 또는 스타일링 라이브러리가 필요 이상으로 도입됐는지 확인합니다.
8. token과 전역 스타일의 소유 위치가 스타일 문서와 일치하는지 확인합니다.
9. 구조 변경이 문서와 일치하는지 확인합니다.

## Dependency And Commonization

의존 방향과 공통화 기준은 `docs/architecture/app-structure.md`의 `Dependency Direction`과 `Commonization Rules`를 따릅니다.

리뷰에서는 금지된 import가 없는지, `shared` 이동 근거가 실제 사용처에서 확인되는지, 제품 업무 지식 없이 공통 코드의 책임을 설명할 수 있는지 검증합니다.

현재 구조로 표현하기 어려운 제품 기능이 여러 페이지에서 반복되면 즉시 `shared`에 넣지 않습니다. 기능 소유권과 예상 의존 방향을 먼저 제시하고 `features` 같은 새 계층 도입이 기존 복잡도를 실제로 줄이는지 검토합니다.

## Review Output

코드 리뷰 요청에서는 문제를 심각도 순으로 작성합니다.

```markdown
- [P1/P2/P3] 문제 제목
- 근거 파일과 위치
- 현재 위험
- 수정 방향
```

문제가 없으면 명확히 말하고 남은 검증 공백만 기록합니다.
