# Week05 Next.js 배포하기

1학기 React 투두리스트(`week05/todo-project`)를 Next.js로 옮기고, Vercel과 GitHub Actions로 자동 배포

배포 주소: https://week05-todo.vercel.app/

## React 버전과 Next.js 버전의 차이

### 앱을 시작하는 파일

React 버전은 Create React App
화면 내용에 `src/App.js`가 있었음

Next.js에서는 `app/page.tsx`가 `/` 주소의 화면이됨

### 라우팅

이번 투두리스트는 페이지가 `/` 하나라서 React Router는 쓰지 않았다.
React에서는 컴포넌트를 직접 렌더링했고, Next.js App Router에서는 파일 위치가 주소->페이지가 더 생기면 `app/폴더이름/page.tsx`를 만들어 그 폴더 이름이 주소가 되도록 했다.

### 서버 컴포넌트와 `"use client"`

Next.js 파일은 서버 컴포넌트이므로 `useState`, `useEffect`, 클릭 이벤트, `localStorage`를 쓸 수 없다.

투두리스트는 입력, 추가, 체크, 수정, 삭제와 브라우저 저장이 전부라서 `page.tsx`, `TodoInput.tsx`, `TodoItem.tsx`, `TodoList.tsx` 첫 줄에 `"use client"`를 넣었다. 클릭이 없는 `layout.tsx`는 서버 컴포넌트로 두었다.

### JavaScript와 TypeScript

React 버전은 `.js`였어서 매개변수 타입을 적지 않아도 실행됐다.

Next.js 버전은 `.tsx`라서 `app/types/todo.ts`에 할 일 모양을 한 번 선언하고 재사용했다.

```ts
export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};
```

`useState([])`처럼 빈 배열만 두면 TypeScript가 원소를 `never`로 추론해서 `todo.id`를 읽지 못했다. `useState<Todo[]>([])`로 상태를 선언하고, `addTodo`의 `text`, `deleteTodo`의 `id`처럼 함수 인자에도 타입을 붙여서 에러를 해결했다.

### 스타일

`import "./App.css` 를 `app/globals.css`로 옮겼다.

