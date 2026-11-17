# 6~8주차 세미나 과제 — Next.js 게시판 만들기

Next.js(App Router)와 MongoDB Atlas로 만든 게시판입니다.
6주차에 만든 게시판 위에 7주차(로그인·권한·좋아요·댓글), 8주차(이미지 업로드·다크모드) 기능을 이어서 추가했습니다.

> 6~8주차 과제는 하나의 프로젝트로 이어지기 때문에 모두 `week06` 폴더에서 작업했습니다.

## 기술 스택

- Next.js 16 (App Router + Pages Router API Routes), TypeScript
- MongoDB Atlas (`mongodb` 드라이버)
- NextAuth (GitHub 로그인, `@next-auth/mongodb-adapter`로 세션·유저를 DB에 저장)
- AWS S3 (`@aws-sdk/client-s3`, `@aws-sdk/s3-presigned-post`)
- Tailwind CSS v4
- 글씨체: Gowun Dodum(본문), Jua(제목·버튼) — `next/font/google`

---

## 6주차 — 게시판 기본 기능 (CRUD)

| 기능             | 경로                                      | 구현 방식                                                                                                                  |
| ---------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| DB 연결          | `utils/database.ts`                       | 접속 주소는 `.env.local`의 `MONGODB_URI`에서 읽고, 개발 모드에서는 연결을 `global`에 저장해 재사용                         |
| 글 목록          | `/list`                                   | 서버 컴포넌트에서 `find().toArray()`로 전체 글 조회, `export const dynamic = "force-dynamic"`으로 요청마다 새로 렌더링     |
| 글 상세          | `/detail/[id]`                            | 동적 라우트의 `params.id`로 `findOne` 조회, 잘못된 id나 없는 글은 `notFound()`로 404                                       |
| 페이지 이동 버튼 | 상세·작성·수정·회원가입                   | `useRouter`(`next/navigation`)의 `back`, `forward`, `push`, `refresh`, `prefetch` 사용 — 버튼만 클라이언트 컴포넌트로 분리 |
| 글 작성          | `/write` → `POST /api/post/new`           | HTML form으로 전송, 서버에서 빈 값 검사 후 `insertOne`, 저장 뒤 `/list`로 redirect                                         |
| 글 수정          | `/edit/[id]` → `POST /api/post/edit`      | 기존 글을 `defaultValue`로 채우고 숨김 input으로 `_id` 전달, 서버에서 `updateOne` + `$set`                                 |
| 글 삭제          | 목록의 "삭제" → `DELETE /api/post/delete` | `fetch`(Ajax)로 새로고침 없이 요청, 성공하면 카드의 `opacity`를 0으로 바꿔 1초 동안 서서히 사라지게 함                     |
| 페이지 캐싱 실습 | `/list2`                                  | `export const revalidate = 20`으로 20초 단위 캐싱 (`npm run build` → `npm run start`로 확인)                               |
| 회원가입         | `/signup` → `POST /api/auth/signup`       | 아이디·비밀번호를 `user` 컬렉션에 저장, `findOne`으로 같은 아이디가 있으면 가입 차단                                       |

### 회원가입 세부 사항

- 아이디는 영문, 숫자 10자 이내만 가능
  - 입력할 때: 영문·숫자가 아닌 글자(공백, 한글, 특수문자)는 바로 지워짐
  - 제출할 때: `pattern`, `maxLength`로 브라우저가 한 번 더 검사
  - 서버에서: 정규식으로 다시 검사 (개발자 도구로 우회해도 막힘)
- 결과(빈 값, 형식 오류, 중복 아이디, 가입 완료)는 쿼리스트링으로 전달해 페이지에 문구로 표시
- 과제 안내에 따라 비밀번호는 암호화하지 않고 저장

---

## 7주차 — 로그인, 권한, 좋아요, 댓글

| 기능             | 경로                                        | 구현 방식                                                                                                           |
| ---------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| GitHub 로그인    | `pages/api/auth/[...nextauth].ts`           | NextAuth `GithubProvider` + `MongoDBAdapter`로 유저·세션을 DB에 저장                                                |
| 로그인 상태 표시 | `components/Header.tsx`                     | `layout.tsx`(서버)에서 `getServerSession`으로 세션을 읽어 props로 전달, 로그인 시 프로필 사진·이름·로그아웃 표시     |
| 유저 권한(role)  | `[...nextauth].ts`, `types/next-auth.d.ts`  | 새 유저가 가입되면 `events.createUser`에서 `role: "normal"` 저장, `session` 콜백에서 세션에 `role`을 넣어줌          |
| 작성자 기록      | `POST /api/post/new`                        | 글을 저장할 때 세션의 이메일·이름을 `author`, `authorName`으로 함께 저장 — 로그인하지 않으면 `401`                   |
| 수정·삭제 권한   | `utils/auth.ts`의 `canModify`               | 본인 글이거나 `admin`이면 허용 — 수정 페이지, 수정 API, 삭제 API에서 모두 같은 함수로 검사하고 아니면 `403`          |
| 좋아요           | `/detail/[id]` → `POST /api/post/like`      | `like` 컬렉션에 `{ postId, userEmail }` 저장, 두 필드에 unique 인덱스를 걸어 한 사람이 한 번만 누를 수 있게 함       |
| 댓글             | `/detail/[id]` → `/api/comment/new`, `list` | 댓글 작성 후 목록 API를 다시 불러와 새로고침 없이 갱신, 로그인하지 않으면 입력창 대신 안내 문구 표시                 |
| 글 삭제 정리     | `DELETE /api/post/delete`                   | 글을 지울 때 그 글의 좋아요·댓글도 `deleteMany`로 함께 삭제                                                          |

### 좋아요 세부 사항

- 상세 페이지(서버 컴포넌트)에서 좋아요 수(`countDocuments`)와 내가 눌렀는지를 미리 조회해 `LikeButton`에 props로 전달
- 이미 누른 글이면 버튼이 `♥`로 바뀌고 비활성화됨
- 중복 요청이 와도 unique 인덱스 때문에 DB에서 막히고, 이 경우 서버는 `409`로 응답
- 누른 뒤에는 `router.refresh()`로 서버 컴포넌트를 다시 그려 숫자를 갱신

---

## 8주차 — 이미지 업로드, 다크모드

### 1. 이미지 업로드 & 조회

| 단계                      | 파일                                 | 구현 방식                                                                                         |
| ------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------- |
| presigned URL 발급        | `pages/api/post/image.ts`            | 로그인한 사용자만, 이미지 타입(`image/*`)만 허용, 5MB 제한 조건을 건 presigned POST URL 발급 (60초 유효) |
| S3 업로드 + 미리보기      | `app/write/ImageUpload.tsx`          | 파일을 고르면 presigned URL로 브라우저에서 S3에 바로 업로드하고, 올라간 S3 주소로 미리보기 표시     |
| 글과 함께 저장            | `ImageUpload.tsx` → `/api/post/new`  | 이미지 주소를 숨김 input(`name="image"`)에 담아 글 작성 form과 함께 전송, `post` 문서에 `image`로 저장 |
| 상세 페이지 조회          | `app/detail/[id]/page.tsx`           | 글에 `image`가 있으면 제목 아래에 이미지 표시                                                      |

#### 업로드 흐름

```
[파일 선택] ─▶ GET /api/post/image?file=...&type=...   (우리 서버: presigned URL 발급)
           ─▶ POST {S3 url} + fields + file            (브라우저 → S3 직접 업로드)
           ─▶ 미리보기 <img src={url + key}>, 숨김 input에 주소 저장
[게시]     ─▶ POST /api/post/new (title, content, image) ─▶ MongoDB 저장
[상세]     ─▶ post.image로 이미지 표시
```

#### 세부 사항

- **이미지 1장만 업로드**: 파일 input에 `multiple`을 쓰지 않고, 다시 고르면 이전 이미지를 대체함. 미리보기의 "삭제" 버튼으로 뺄 수도 있음
- **파일은 우리 서버를 거치지 않음**: 서버는 업로드 권한(presigned URL)만 만들어 주고, 실제 파일은 브라우저가 S3로 바로 보내서 서버 부담이 없음
- **AWS 키는 서버에만 있음**: 키는 `.env.local`에서 API Route만 읽고, 브라우저는 60초짜리 presigned URL만 받음
- **파일 이름 충돌 방지**: S3 키는 `images/{crypto.randomUUID()}.{확장자}`로 만들어 같은 이름의 파일을 올려도 덮어쓰지 않음
- **저장할 주소 검사**: 글 작성 API에서 우리 버킷(`https://{버킷}.s3.`)의 `images/` 주소일 때만 `image`를 저장
- **업로드 상태 표시**: 업로드 중, 실패, 선택된 파일 이름을 버튼 오른쪽에 표시
- **파일 선택 버튼 디자인**: 브라우저 기본 파일 input은 숨기고(`sr-only`), 이를 감싼 `<label>`을 다른 버튼과 같은 모양으로 꾸밈

### 2. 다크모드 토글

| 요구 사항                         | 구현 방식                                                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| 다크모드면 🌙, 라이트모드면 ☀️    | `ThemeToggle`이 현재 테마 state에 따라 버튼 글자를 바꿈                                                      |
| 쿠키 꺼내는 코드 줄이기           | `layout.tsx`에서 `cookies()`로 **한 번만** 읽고 `Header` → `ThemeToggle`에 props로 전달, 이후엔 state로만 관리 |
| body뿐 아니라 전체 테마 적용      | `globals.css`에서 `body[data-theme="dark"]`일 때 카드·입력창·버튼·테두리·글자 색을 모두 다크 팔레트로 바꿈    |

#### 테마 흐름

```
layout.tsx (서버)
  └─ cookies().get("theme") ─▶ <body data-theme={theme}>
                            └─▶ <Header theme={theme}> ─▶ <ThemeToggle initialTheme={theme}>

ThemeToggle (클라이언트)
  └─ 클릭 ─▶ setTheme(next)                 버튼 글자 변경
         ─▶ document.body.dataset.theme     화면 색 변경
         ─▶ document.cookie = "theme=..."    다음 방문 때 서버가 읽을 수 있게 저장 (1년)
```

#### 세부 사항

- **새로고침해도 깜빡이지 않음**: 서버가 쿠키를 읽어 처음부터 `data-theme`을 붙인 HTML을 보내기 때문에, 다크모드에서 흰 화면이 잠깐 보이는 문제가 없음 (localStorage를 쓰면 화면이 그려진 뒤에야 테마를 알 수 있어 깜빡임)
- **`useEffect` 없이 구현**: 초기값은 props로 받고 변경은 클릭 핸들러에서만 하기 때문에 effect가 필요 없음
- **다크 팔레트**: 새까만 검정 대신 기존 크림 톤과 어울리는 따뜻한 어두운 색을 CSS 변수(`--dk-*`)로 정의
  - 페이지 배경 `#1a1814`, 카드·입력창 `#24211b`, 헤더 `#2b271f`
  - 크림색 주 버튼은 다크모드에서 금색 포인트 버튼(`#e2cd94`) + 어두운 글씨로 바뀜
  - 회색 보조 글씨, placeholder, hover·focus 테두리도 어두운 배경에서 읽히는 밝기로 조정
- **컴포넌트는 그대로 두고 CSS로 덮어쓰기**: Tailwind 유틸리티는 `@layer` 안에 있어서, 레이어 밖에 쓴 `body[data-theme="dark"] .bg-white` 같은 규칙이 우선 적용됨. 덕분에 각 컴포넌트에 `dark:` 클래스를 하나하나 붙이지 않음
- **브라우저 기본 요소도 다크**: `color-scheme: dark`로 스크롤바·입력창 등도 어둡게 표시
- **부드러운 전환**: 배경·테두리·글자 색이 0.2초 동안 바뀌도록 `transition`을 `@layer base`에 넣어, 목록 카드의 삭제 애니메이션 같은 기존 `transition`은 그대로 동작

---

## 서버 API 공통 처리

- 허용하지 않은 메서드는 `405`, 잘못된 입력은 `400`, 로그인 필요는 `401`, 권한 없음은 `403`, 없는 글은 `404`, DB 오류는 `500`으로 응답
- `req.body`를 그대로 저장하지 않고 필요한 필드만 골라 저장
- 로그인 여부와 작성자 권한은 화면에서만 숨기지 않고 API에서도 `getServerSession`으로 다시 검사

## 폴더 구조

```
src
├─ app
│  ├─ layout.tsx             세션·테마 쿠키를 읽어 Header와 body에 전달
│  ├─ page.tsx               메인
│  ├─ list/                  글 목록 + ListItem(수정·삭제)
│  ├─ list2/                 캐싱 실습용 목록
│  ├─ detail/[id]/           글 상세 + 이미지, NavButtons, LikeButton, Comment
│  ├─ write/                 글 작성 + ImageUpload
│  ├─ edit/[id]/             글 수정
│  ├─ signup/                회원가입
│  └─ test/                  useSession 실습
├─ components                Header, ThemeToggle, LoginButton, LogoutButton, PageNavButtons, UsernameInput
├─ pages/api
│  ├─ post/                  new, edit, delete, like, image
│  ├─ comment/               new, list
│  ├─ auth/                  [...nextauth], signup
│  └─ test.ts                첫 API 실습
├─ models                    Post, User, Like, Comment 타입
├─ types/next-auth.d.ts      세션에 role 타입 추가
└─ utils                     database(DB 연결), auth(canModify)
```

## 실행 방법

1. `week06/.env.local` 파일을 만들고 아래 값을 넣습니다.
   ```
   MONGODB_URI="mongodb+srv://아이디:비밀번호@cluster0.xxxxx.mongodb.net/"

   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_CLIENT_ID="GitHub OAuth App의 Client ID"
   NEXTAUTH_CLIENT_SECRET="GitHub OAuth App의 Client Secret"
   NEXT_PUBLIC_JWT_KEY="세션 암호화용 아무 긴 문자열"

   AWS_REGION="버킷이 있는 리전 (예: ap-southeast-2)"
   AWS_ACCESS_KEY_ID="IAM 액세스 키"
   AWS_SECRET_ACCESS_KEY="IAM 시크릿 키"
   AWS_BUCKET_NAME="버킷 이름"
   ```
2. S3 버킷에 아래 설정을 해둡니다.
   - **CORS**: 브라우저에서 바로 업로드할 수 있도록 허용
     ```json
     [
       {
         "AllowedHeaders": ["*"],
         "AllowedMethods": ["POST", "GET"],
         "AllowedOrigins": ["http://localhost:3000"],
         "ExposeHeaders": ["ETag"]
       }
     ]
     ```
   - **버킷 정책**: `images/*` 경로에 공개 읽기(`s3:GetObject`) 허용 — 미리보기와 상세 페이지에서 이미지를 보여주기 위해 필요
   - `AWS_REGION`은 버킷이 실제로 만들어진 리전과 같아야 합니다. 다르면 S3가 `301 PermanentRedirect`로 응답해 업로드가 실패합니다.
3. 패키지를 설치하고 개발 서버를 실행합니다.
   ```bash
   npm install
   npm run dev
   ```
4. http://localhost:3000 에 접속합니다.
