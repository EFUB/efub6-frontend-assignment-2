# Todo 앱: React → Next.js 마이그레이션

기존 React로 만든 Todo 앱을 Next.js(App Router)로 옮긴 프로젝트입니다.

## 실행 방법

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## 기능

- `/` : 할 일 추가 · 수정 · 완료 체크 · 삭제, 남은 할 일 개수 표시, localStorage 저장
- `/time` : 현재 날짜와 1초마다 갱신되는 현재 시각

## React vs Next.js 비교

| 구분              | 기존 React                                          | Next.js                                                                                 |
| ----------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 렌더링            | 브라우저에서 JS가 실행된 뒤 화면을 그림 (CSR)       | 서버에서 HTML을 미리 만들어 보내고 브라우저에서 이어서 동작 (SSR / 프리렌더링)          |
| 라우팅            | `react-router-dom` 등으로 라우트를 코드에 직접 등록 | 폴더 구조가 곧 경로 (`app/page.tsx` → `/`, `app/time/page.tsx` → `/time`)               |
| 페이지 이동       | 라우터 라이브러리의 `Link` / `useNavigate`          | `next/link`의 `Link`                                                                    |
| 진입점            | `index.js`에서 `App`을 `root`에 렌더링              | `app/layout.tsx`가 모든 페이지를 감싸는 공통 레이아웃                                   |
| 페이지 제목       | `public/index.html`의 `<title>` 수정                | `layout.tsx`에서 `export const metadata = { title: "Todo" }`                            |
| 컴포넌트 종류     | 모든 컴포넌트가 브라우저에서 실행                   | 기본은 서버 컴포넌트. `useState`, `useEffect`, 이벤트 핸들러를 쓰면 `"use client"` 필요 |
| localStorage      | 처음 렌더링할 때 바로 읽을 수 있음                  | 서버에는 `window`가 없어서 `useEffect`(마운트 후)에서 읽어야 함                         |
| styled-components | 별도 설정 없이 사용                                 | 서버 렌더링 시 스타일이 빠지지 않도록 Registry와 `next.config.ts` 설정 필요             |
| 언어              | JavaScript                                          | TypeScript (props · state 타입 정의)                                                    |
| import 경로       | `../../components/...` 같은 상대 경로               | `@/components/...` 절대 경로 별칭                                                       |

## 옮기면서 바뀐 부분

### 1. 파일 기반 라우팅

```
src/app/
├── layout.tsx      # 공통 레이아웃
├── page.tsx        # /      (Todo)
└── time/
    └── page.tsx    # /time  (현재 시각)
```

라우터 설정 코드 없이 폴더를 만들면 경로가 생깁니다. 페이지 이동은 `next/link`의 `Link`를 사용했습니다 (`TimeButton`, `TodoButton`).

### 2. `"use client"`

Next.js의 컴포넌트는 기본이 서버 컴포넌트라서 상태나 이벤트를 쓰는 파일에는 `"use client"`를 붙였습니다.

- `app/page.tsx` : `useState`, `useEffect`로 todos 관리
- `app/time/page.tsx` : `setInterval`로 시계 갱신
- `TodoCreate`, `TodoItem`, `TodoList` : 입력 · 클릭 이벤트

### 3. localStorage는 마운트 후에

React에서는 `useState(() => JSON.parse(localStorage.getItem("todos")))`처럼 처음부터 읽을 수 있지만, Next.js는 서버에서도 한 번 렌더링하기 때문에 서버에는 `localStorage`가 없어 에러가 납니다.

```tsx
const [todos, setTodos] = useState<Todo[]>([]);
const [loaded, setLoaded] = useState(false);

useEffect(() => {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) setTodos(JSON.parse(savedTodos));
  setLoaded(true);
}, []);

useEffect(() => {
  if (loaded) localStorage.setItem("todos", JSON.stringify(todos));
}, [todos, loaded]);
```

`loaded` 플래그로 저장된 값을 불러오기 전에 빈 배열이 localStorage를 덮어쓰는 것을 막았습니다.

### 4. styled-components 설정

서버에서 만든 HTML에 스타일이 같이 들어가지 않으면 처음에 스타일 없는 화면이 잠깐 보이거나 className 불일치 경고가 생깁니다. 이를 위해 두 가지를 추가했습니다.

- `next.config.ts` : `compiler: { styledComponents: true }`
- `src/lib/registry.tsx` : `useServerInsertedHTML`로 서버 렌더링 시 생성된 스타일을 HTML에 삽입하고, `layout.tsx`에서 전체를 감쌈

### 5. TypeScript 적용

`Todo` 타입과 각 컴포넌트의 props 타입(`TodoItemProps`, `TodoListProps` 등)을 정의해 잘못된 값을 넘기면 개발 중에 바로 알 수 있도록 했습니다.

## 정리

- Next.js는 라우팅 · 레이아웃 · 메타데이터를 프레임워크가 제공해서 설정 코드가 줄어든다.
- 대신 서버에서도 렌더링되기 때문에 브라우저 전용 기능(`localStorage`, `window`, 상태 · 이벤트)은 `"use client"`와 `useEffect`로 구분해서 써야 한다.
- CSS-in-JS 라이브러리는 서버 렌더링을 위한 추가 설정이 필요하다.
