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
[Style] BDYFE-XXX 디자인 토큰 설정
```

PR 대상 브랜치는 기본적으로 `develop`을 사용합니다.

### Automatic Labels

PR이 열리거나 다시 열릴 때, draft가 해제될 때 또는 제목이 수정될 때 PR 제목의 작업 유형과 작성자 GitHub 계정을 기준으로 라벨을 자동 지정합니다.

지원하는 PR 제목 유형은 `Init`, `Feat`, `Fix`, `Docs`, `Refactor`, `Style`, `Chore`, `Deploy`입니다. 제목은 `[Style]`처럼 대괄호로 감싼 작업 유형으로 시작해야 합니다.

PR 제목의 작업 유형이 변경되면 기존 작업 유형 라벨은 제거하고 새 작업 유형 라벨을 지정합니다. 작업 유형 또는 작성자에 대응하는 라벨이 없으면 해당 라벨은 추가하지 않습니다.

## Rules

- 하나의 PR은 가능한 하나의 Jira issue 범위에 맞춥니다.
- 작업 구분은 Jira label 또는 component로 처리합니다.
- 브랜치와 PR에는 Jira key를 포함합니다.
- 커밋은 독립적으로 리뷰하고 되돌릴 수 있는 작업 단위로 나눕니다.
- 생성 파일, lockfile과 설정 변경은 의도를 확인한 뒤 함께 커밋합니다.
- 사용자 작업이나 다른 변경을 임의로 포함하거나 되돌리지 않습니다.
