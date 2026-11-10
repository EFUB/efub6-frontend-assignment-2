# 6주차 과제 1 — Next.js 게시판

Next.js App Router, TypeScript, MongoDB로 만든 게시판입니다.

## 구현한 기능

- **Styling**: `src/app/globals.css`를 루트 레이아웃에서 불러와 배경, 글 목록 카드, 링크, 버튼, 입력창을 꾸몄습니다. 삭제 성공 시 카드가 사라지는 애니메이션을 적용했습니다.
- **회원가입**: `/register`에서 아이디와 비밀번호를 입력해 `POST /api/register`로 전송합니다. 서버에서 빈 아이디와 4자 미만 비밀번호를 거절하고, 아이디 앞뒤 공백을 제거합니다. `forum.users`에 아이디, salt를 포함한 scrypt 비밀번호 해시, 가입 시각을 저장합니다.
- **중복 아이디 차단**: 기존 아이디 조회와 `username` 고유 인덱스를 사용합니다. 동시에 같은 아이디로 가입해도 중복 저장을 차단하며, 중복 요청에는 409 응답과 안내 문구를 반환합니다.
- **페이지 이동**: 상세 페이지의 `NavButtons.tsx`에서 `next/navigation`의 `useRouter`를 사용합니다. `back`, `forward`, `push`, `refresh` 버튼과 글쓰기 버튼의 마우스 진입·키보드 포커스 시 `prefetch`를 구현했습니다. 뒤로·앞으로 이동은 브라우저 방문 기록에 따라 작동합니다. 가입 성공 시 목록으로 이동합니다.
- **게시판 CRUD**: `forum.post`에서 목록·상세를 조회하고, API Routes로 작성·수정·삭제합니다. 입력값과 게시글 ID를 검증하며, 없는 글은 404로 처리합니다. 삭제 실패 시 오류를 표시합니다.

회원가입만 구현했으며 로그인과 사용자별 게시글 권한 기능은 포함하지 않습니다.

## 실행 방법

Node.js 20.19 이상과 MongoDB 연결 환경이 필요합니다.

```bash
cd week06
npm ci
```

`week06/.env.local`에 연결 정보를 입력합니다. 실제 비밀번호가 포함된 파일은 Git에 올리지 않습니다.

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017
# 선택: 로컬 DNS에서 Atlas SRV 조회가 실패할 때만 설정
# MONGODB_DNS_SERVERS=1.1.1.1,8.8.8.8
```

Atlas를 사용한다면 `MONGODB_URI`에 Atlas 연결 문자열을 넣고 DB 사용자 권한과 접속 IP를 설정합니다. 데이터베이스 이름은 코드에서 `forum`으로 지정합니다. 회원가입 시 고유 인덱스를 만들므로 해당 권한이 필요하며, 기존 `users` 데이터에 중복 아이디가 있으면 먼저 확인해야 합니다.

`src/utils/database.ts`에서 환경변수로 MongoClient를 연결하고 개발 환경에서는 전역 Promise로 연결을 재사용합니다.

```bash
npm run dev
```

브라우저에서 http://localhost:3000 에 접속합니다.

| 경로 | 기능 |
| --- | --- |
| `/` | 목록·글쓰기·회원가입 링크 |
| `/register` | 회원가입 |
| `/list` | 글 목록·수정 링크·삭제 버튼 |
| `/write` | 글 작성 |
| `/detail/[id]` | 글 상세·페이지 이동 버튼 |
| `/edit/[id]` | 글 수정 |

## 검증 및 프로덕션 실행

```bash
npm run lint
npm run build
npx tsc --noEmit
npm start
```

빌드 및 실행 시 MongoDB 환경변수를 준비합니다. `next/font/google`의 폰트 다운로드를 위해 빌드 환경에서 네트워크 연결도 필요합니다.

검증 결과: `npm run lint`, `npm run build`, `npx tsc --noEmit`을 통과했습니다. 프로덕션 서버와 실제 MongoDB에서 회원가입 입력 검증, 동일 아이디 동시 요청 3건(201 1건·409 2건), 비밀번호 해시 저장, 게시글 작성·조회·수정·삭제와 없는 글의 404 응답을 확인했습니다. 페이지 HTML의 CSS 연결과 내비게이션 이벤트 구현을 확인했으며, 브라우저 버튼 클릭과 시각적 화면 검수는 별도로 수행하지 않았습니다. 검증용 데이터는 삭제했습니다.
