# Git Convention

## Jira Key

프론트엔드 작업은 `BDYFE-*` Jira key를 사용합니다.

## Branch

브랜치 이름에는 Jira key와 작업 성격을 포함합니다.

```text
init/BDYFE-XXX-create-react-project
feat/BDYFE-XXX-add-document-review-list
fix/BDYFE-XXX-document-review-layout
docs/BDYFE-XXX-update-app-structure
chore/BDYFE-XXX-update-workflow
```

## Commit

커밋 메시지는 작업 의도가 드러나게 작성합니다.

```text
init: React 프로젝트 생성
feat: 서류 인증 목록 구현
fix: 서류 인증 상세 레이아웃 수정
docs: 앱 구조 문서 갱신
chore: 의존성 업데이트
```

개별 커밋의 Jira key는 선택 사항입니다. Jira 추적은 브랜치와 PR 연결을 기본으로 하며, squash merge를 사용한다면 최종 merge commit 또는 PR 제목에 Jira key가 남도록 합니다.

## Pull Request

PR 제목에는 작업 유형과 Jira key를 포함합니다.

```text
[Init] BDYFE-XXX React 프로젝트 생성
[Feat] BDYFE-XXX 서류 인증 목록 구현
```

PR 대상 브랜치는 기본적으로 `develop`을 사용합니다.

## Rules

- 하나의 PR은 가능한 하나의 Jira issue 범위에 맞춥니다.
- 작업 구분은 Jira label 또는 component로 처리합니다.
- 브랜치와 PR에는 Jira key를 포함합니다.
- 커밋은 독립적으로 리뷰하고 되돌릴 수 있는 작업 단위로 나눕니다.
- 생성 파일, lockfile과 설정 변경은 의도를 확인한 뒤 함께 커밋합니다.
- 사용자 작업이나 다른 변경을 임의로 포함하거나 되돌리지 않습니다.
