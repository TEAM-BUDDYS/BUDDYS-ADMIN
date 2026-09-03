# Agent Harness

BUDDYS-ADMIN의 Agent Harness는 AI가 저장소의 규칙과 현재 코드를 근거로 일관되게 작업하도록 돕는 문서와 절차의 집합입니다.

## Structure

```text
AGENTS.md
.agents/
  skills/
    {skill-name}/
      SKILL.md
      agents/
        openai.yaml
docs/
  agent/
  architecture/
  conventions/
  workflows/
```

## Responsibilities

- `AGENTS.md`: 저장소 진입점, 핵심 불변량과 문서·Skill 라우팅
- `.agents/skills/*/SKILL.md`: 작업 유형별 판단과 실행 절차
- `.agents/skills/*/agents/openai.yaml`: Skill UI 표시 정보와 기본 호출 프롬프트
- `docs`: 프로젝트 구조, 컨벤션과 팀 작업 절차의 원본

## Skills

| Skill                       | Purpose                                    |
| --------------------------- | ------------------------------------------ |
| `repo-orientation`          | 브랜치, 구조, 관련 문서와 기존 패턴 확인   |
| `frontend-task-workflow`    | 요청 유형 분류와 작업 흐름 선택            |
| `page-feature-workflow`     | SPA 페이지, 라우트와 화면 흐름 구현        |
| `shared-component-workflow` | 공통 UI와 디자인 토큰의 재사용 경계 설계   |
| `api-integration-workflow`  | 브라우저 API 연동과 UI 상태 연결           |
| `architecture-review`       | `app/pages/shared` 소유권과 의존 방향 검토 |
| `verify-frontend`           | 변경 범위에 맞는 정적 검사와 UI 검증       |

## Usage

일반 작업은 Skill 이름을 외우지 않고 자연어로 요청할 수 있습니다.

```text
BDYFE-XXX 서류 인증 목록 페이지 구현해줘
현재 브랜치의 폴더 구조를 리뷰해줘
커밋 전 최종 검증해줘
```

특정 절차를 명확하게 적용하고 싶다면 Skill을 직접 호출할 수 있습니다.

```text
$page-feature-workflow 서류 인증 상세 화면을 구현해줘
$architecture-review 현재 변경사항의 의존 방향을 검토해줘
$verify-frontend 커밋 전에 검증해줘
```

## Source Of Truth

상세 규칙을 여러 파일에 그대로 복사하지 않습니다.

- 구조와 의존 방향은 `docs/architecture/*`
- 코딩과 Git 규칙은 `docs/conventions/*`
- 팀 작업 절차는 `docs/workflows/*`
- Skill은 관련 문서를 연결하고 작업별 판단과 실행 순서를 정의

문서가 충돌하면 실제 코드와 가장 가까운 Source of Truth를 확인하고 충돌한 문서를 함께 수정합니다.

## Scope

현재 Harness는 단일 Vite SPA 기준입니다. 다음 요소는 실제 필요가 생기기 전까지 추가하지 않습니다.

- 모노레포와 workspace 전용 Skill
- 특정 라우터, API 또는 상태 관리 라이브러리를 강제하는 절차
- 디자인 시스템 패키지 전용 Skill
- Jira, Figma 또는 MCP 자동화
- 파일 generator
- 저장소에 커밋되는 개인 설정

## Maintenance

자세한 유지보수 원칙은 [Maintenance](./maintenance.md)를 따릅니다.
