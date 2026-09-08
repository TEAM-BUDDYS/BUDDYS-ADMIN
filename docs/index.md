# BUDDYS-ADMIN Docs

BUDDYS-ADMIN의 구조와 개발 규칙을 정리합니다.

## Agent

- [Agent Harness](./agent/index.md)
- [Agent Harness Maintenance](./agent/maintenance.md)
- Agent Skills: `.agents/skills/`

## Architecture

- [Repo Structure](./architecture/repo-structure.md)
- [App Structure](./architecture/app-structure.md)
- [Styling](./architecture/styling.md)

## Conventions

- [Git Convention](./conventions/git.md)
- [Coding Convention](./conventions/conventions.md)

## Workflows

- [Local Development](./workflows/local-development.md)
- [Continuous Integration](./workflows/ci.md)
- [Feature Development](./workflows/feature-development.md)
- [Dependency Maintenance](./workflows/dependency-maintenance.md)
- [Verification](./workflows/verification.md)

## Maintenance Rule

- 새 규칙은 가장 가까운 세부 문서에 추가합니다.
- README에는 프로젝트 소개와 빠른 시작처럼 사람에게 필요한 진입 정보만 둡니다.
- 실제 코드 구조가 바뀌면 관련 문서도 함께 수정합니다.
- 상세 규칙은 중복하지 않고 항상 필요한 핵심 불변량과 라우팅만 `AGENTS.md`와 Skill에 요약합니다.
