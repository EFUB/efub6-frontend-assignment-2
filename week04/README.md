# 같이 공부해요

EFUB 프론트엔드 4주차 Next.js 세미나 과제입니다. 시험기간 카공, 프론트 과제, 토익 스피킹 스터디를 볼 수 있습니다. 실제 모집이 아닌 샘플 데이터를 사용합니다.

## 실행 방법

현재 저장소 루트에서 아래 명령어를 실행합니다. Node.js 20.9 이상이 필요합니다.

```bash
cd week04
npm ci
npm run dev
```

브라우저에서 http://localhost:3000 에 접속합니다. 의존성이 이미 설치되어 있다면 `npm ci`는 생략할 수 있습니다.

```bash
# week04 폴더에서 실행
npm run lint
npm run build
npm run start
```

`npm run start`는 빌드 성공 후 실행합니다. Next.js 16.3.8, React 19.2.8, TypeScript를 사용합니다. `next/font/google`의 Noto Sans KR은 개발 및 빌드 시 폰트를 받기 위한 네트워크 연결이 필요하며, 브라우저에는 자체 호스팅됩니다.

## 주요 라우트

| 경로 | 페이지 |
| --- | --- |
| `/` | 소개와 추천 스터디 |
| `/studies` | 전체 스터디 목록 |
| `/studies/guide` | 참여 방법과 모임 약속 |
| `/studies/[id]` | 스터디별 상세 정보 |

상세 페이지 예시: `/studies/frontend`, `/studies/reading`, `/studies/english`. 없는 ID는 스터디용 404 안내와 목록 이동 링크를 표시합니다.

## 구현 기능

- 공통 헤더, 내비게이션, 푸터와 `Link`를 통한 페이지 이동
- 스터디 카드 목록 및 개별 모임의 시간, 장소, 참여 대상, 활동 표시
- 관심 표시 버튼의 선택 및 해제, 상태 안내
- 참여 안내 페이지 및 잘못된 스터디 ID 처리
- 모바일·태블릿·데스크톱에 대응하는 반응형 레이아웃
- 키보드 포커스 표시, 본문 바로가기, 이미지 대체 텍스트, 버튼의 `aria-pressed`
- 페이지별 제목과 사이트 설명 메타데이터

관심 표시는 `useState`로만 관리합니다. 페이지를 떠나거나 새로고침하면 초기화되며 계정, 서버 저장, 실제 신청 기능은 없습니다. 이미지 세 개는 프로젝트 안에 작성한 SVG 일러스트로 외부 이미지 서버를 사용하지 않습니다.

## 세미나 개념 적용

| 개념 | 적용 위치와 역할 |
| --- | --- |
| App Router | `app/` 디렉터리에서 페이지와 레이아웃 구성 |
| 공통 `layout.tsx` | `app/layout.tsx`의 헤더·푸터가 모든 페이지를 감쌈 |
| 폴더 기반 라우팅 | `app/studies/page.tsx`가 `/studies`에 대응 |
| 중첩 라우팅과 레이아웃 | `studies/guide`, `studies/[id]`가 `app/studies/layout.tsx`의 스터디 메뉴를 공유 |
| 동적 라우팅 | `app/studies/[id]/page.tsx`에서 `await params`로 ID를 읽어 데이터를 조회. `generateStaticParams`로 샘플 상세 페이지 사전 생성 |
| Server Component | 페이지·레이아웃·`study-card.tsx`는 기본 Server Component. 데이터를 읽고 Client Component를 조합 |
| Client Component | `app/components/interest-button.tsx`에 `"use client"`를 선언해 상호작용 경계를 분리 |
| `useState`, `onClick` | 관심 버튼을 클릭할 때 선택 상태를 전환 |
| Next.js `Image` | 카드와 상세 페이지에서 `public/images/`의 이미지에 크기와 대체 텍스트를 지정. SVG는 벡터 그대로 제공 |
| `next/font` | `app/layout.tsx`에서 Noto Sans KR을 로드하고 CSS 변수로 사이트 전체에 적용 |

샘플 데이터 및 타입은 `app/lib/studies.ts`에 모았습니다. 설치된 Next.js의 `node_modules/next/dist/docs/` 문서를 기준으로 구현했습니다.

`next.config.ts`의 `turbopack.root`를 이 프로젝트 디렉터리로 명시해 저장소 루트의 잠금 파일과 독립적으로 프로젝트 경계를 설정했습니다.

## 검증 결과

- `npm run build`: 성공, TypeScript 검사 및 페이지 사전 생성 완료
- `npm run lint`: 오류·경고 없이 통과
- 프로덕션 서버 HTTP 확인: 홈, 목록, 안내, 상세 3개 페이지와 SVG 3개 모두 200
- `/studies/missing`: 404 응답과 사용자 정의 안내 확인
- 브라우저 미연결로 실제 화면 배치 및 버튼 클릭 검증은 미실시

## 배포 주소

- 배포 URL: **추후 입력**
- 배포 시 프로젝트 루트 디렉터리를 `week04`로 설정합니다.
