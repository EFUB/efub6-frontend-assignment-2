# 6주차 세미나 과제 — Next.js 게시판 만들기

Next.js(App Router)와 MongoDB Atlas로 만든 게시판입니다.
글 목록·상세·작성·수정·삭제(CRUD)와 임시 회원가입 기능이 있습니다.

## 기술 스택

- Next.js 16 (App Router + Pages Router API Routes), TypeScript
- MongoDB Atlas (`mongodb` 드라이버)
- Tailwind CSS v4
- 글씨체: Gowun Dodum(본문), Jua(제목·버튼) — `next/font/google`

## 기능과 구현 방식

| 기능             | 경로                                      | 구현 방식                                                                                                                  |
| ---------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| DB 연결          | `utils/database.ts`                       | 접속 주소는 `.env.local`의 `MONGODB_URI`에서 읽고, 개발 모드에서는 연결을 `global`에 저장해 재사용                         |
| 글 목록          | `/list`                                   | 서버 컴포넌트에서 `find().toArray()`로 전체 글 조회, `export const dynamic = "force-dynamic"`으로 요청마다 새로 렌더링     |
| 글 상세          | `/detail/[id]`                            | 동적 라우트의 `params.id`로 `findOne` 조회, 잘못된 id나 없는 글은 `notFound()`로 404                                       |
| 페이지 이동 버튼 | 상세·작성·수정·회원가입                   | `useRouter`(`next/navigation`)의 `back`, `forward`, `push`, `refresh`, `prefetch` 사용 — 버튼만 클라이언트 컴포넌트로 분리 |
| 글 작성          | `/write` → `POST /api/post/new`           | HTML form으로 전송, 서버에서 빈 값 검사 후 `insertOne`, 저장 뒤 `/list`로 redirect                                         |
| 글 수정          | `/edit/[id]` → `POST /api/post/edit`      | 기존 글을 `defaultValue`로 채우고 숨김 input으로 `_id` 전달, 서버에서 `updateOne` + `$set`                                 |
| 글 삭제          | 목록의 "삭제" → `DELETE /api/post/delete` | `fetch`(Ajax)로 새로고침 없이 요청, 서버에서 `deleteOne` 후 카드의 `opacity`를 0으로 바꿔 1초 동안 서서히 사라지게 함      |
| 페이지 캐싱 실습 | `/list2`                                  | `export const revalidate = 20`으로 20초 단위 캐싱 (`npm run build` → `npm run start`로 확인)                               |
| 회원가입         | `/signup` → `POST /api/auth/signup`       | 아이디·비밀번호를 `user` 컬렉션에 저장, `findOne`으로 같은 아이디가 있으면 가입 차단                                       |

### 회원가입 세부 사항

- 아이디는 영문, 숫자 10자 이내만 가능
  - 입력할 때: 영문·숫자가 아닌 글자(공백, 한글, 특수문자)는 바로 지워짐
  - 제출할 때: `pattern`, `maxLength`로 브라우저가 한 번 더 검사
  - 서버에서: 정규식으로 다시 검사 (개발자 도구로 우회해도 막힘)
- 결과(빈 값, 형식 오류, 중복 아이디, 가입 완료)는 쿼리스트링으로 전달해 페이지에 문구로 표시
- 과제 안내에 따라 비밀번호는 암호화하지 않고 저장

### 서버 API 공통 처리

- 허용하지 않은 메서드는 `405`, 잘못된 입력은 `400`, DB 오류는 `500`으로 응답
- `req.body`를 그대로 저장하지 않고 필요한 필드만 골라 저장

## 폴더 구조

```
src
├─ app
│  ├─ page.tsx               메인
│  ├─ list/                  글 목록 + ListItem
│  ├─ list2/                 캐싱 실습용 목록
│  ├─ detail/[id]/           글 상세 + NavButtons
│  ├─ write/                 글 작성
│  ├─ edit/[id]/             글 수정
│  └─ signup/                회원가입
├─ components                PageNavButtons, UsernameInput
├─ pages/api
│  ├─ post/                  new, edit, delete
│  ├─ auth/signup.ts         회원가입
│  └─ test.ts                첫 API 실습
├─ models                    Post, User 타입
└─ utils/database.ts         DB 연결
```

## 실행 방법

1. `week06/.env.local` 파일을 만들고 MongoDB 접속 주소를 넣습니다.
   ```
   MONGODB_URI="mongodb+srv://아이디:비밀번호@cluster0.xxxxx.mongodb.net/"
   ```
2. 패키지를 설치하고 개발 서버를 실행합니다.
   ```bash
   npm install
   npm run dev
   ```
3. http://localhost:3000 에 접속합니다.
