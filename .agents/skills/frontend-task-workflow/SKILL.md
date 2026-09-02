---
name: frontend-task-workflow
description: BUDDYS-ADMIN의 프론트엔드 요청을 페이지와 라우트, 공통 UI와 디자인 토큰, API 연동, 구조 검토와 검증 흐름으로 분류합니다. 여러 유형이 섞인 기능 구현이나 작업 범위와 검증 수준을 결정해야 할 때 사용합니다.
---

# 프론트엔드 작업 흐름

## Input

- 작업 목표와 완료 기준
- Jira 또는 요구사항
- 대상 page, route와 기존 기능
- 제공된 Figma 또는 API 명세
- 기대 산출물: 코드, 문서, 리뷰 또는 검증

필수 정보가 저장소와 제공 자료에서도 확인되지 않고 결과를 크게 바꾸는 경우 구현 전에 질문합니다.

## Workflow

1. 목표, 범위와 완료 기준을 확인합니다.
2. `AGENTS.md`의 Skill Routing과 `docs/workflows/feature-development.md`를 기준으로 필요한 Skill만 선택합니다.
3. 현재 구조와 기존 패턴을 확인해야 하면 `repo-orientation`을 적용합니다.
4. Figma 또는 API 자료가 있으면 구현 전에 대상과 상태를 확인합니다.
5. 라우터, API client 또는 스타일링 도구가 없다면 현재 작업에 필요한지 판단하고 임의 도입하지 않습니다.
6. 구조 영향이 있으면 `architecture-review`를 적용합니다.
7. 구현 후 `verify-frontend`로 검증하고 결과와 남은 위험을 정리합니다.

## Planning Output

큰 작업에서만 아래 형식으로 계획을 작성합니다.

```markdown
## Frontend Work Plan

- Goal:
- Scope:
- Related paths:
- Skill:
- Infrastructure decision:
- Verification:
- Open questions:
```

## Rules

- 여러 유형이 섞이면 핵심 구현 Skill을 먼저 적용하고 검증 Skill로 마무리합니다.
- 전용 Skill이 없는 문서나 설정 작업은 가까운 Source of Truth와 기존 파일 패턴을 우선합니다.
