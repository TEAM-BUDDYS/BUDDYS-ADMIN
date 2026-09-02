---
name: verify-frontend
description: BUDDYS-ADMIN의 코드, 문서, 설정 또는 UI 변경을 변경 범위와 위험에 맞게 검증합니다. 구현 완료 후, 커밋 전 또는 코드 리뷰 중 lint, TypeScript build, Vite build, 브라우저 동작과 구조 검사가 필요할 때 사용합니다.
---

# 프론트엔드 검증

`docs/workflows/verification.md`를 검증 기준의 원본으로 사용합니다.

## Workflow

1. 현재 변경 파일과 작업 목적을 확인합니다.
2. `Matrix`에서 변경 범위에 맞는 검증을 선택합니다.
3. 필요한 정적 검사와 build를 실행합니다. `pnpm build`를 실행했다면 포함된 TypeScript build를 중복하지 않습니다.
4. UI가 변경됐다면 Browser Checklist의 관련 항목을 실제 화면에서 확인합니다.
5. Structure And Hygiene를 확인하고 성공, 실패, 생략한 검증과 잔여 위험을 구분해 보고합니다.

검증이 실패하면 원인을 확인합니다. 구현 또는 수정 요청에서는 범위 안에서 해결하고 관련 검증을 다시 실행하며, 리뷰 요청에서는 문제와 수정 방향만 보고합니다.

## Rules

- 실행하지 않은 검사를 통과했다고 표현하지 않습니다.
- 검증 범위를 불필요하게 넓히지 않습니다.
- 도구나 환경 문제로 실행하지 못한 검증은 원인과 잔여 위험을 남깁니다.
