# EFUB SHOP — Week03

React + TypeScript + TanStack Query v5로 구현한 무한 스크롤 상품 목록입니다.
기존 `../2부-실습(1).ts`, `../2부-실습(2).ts`는 보존하며 이 프로젝트의 컴파일 대상에서 제외합니다.

## 실행

Node.js 22.12 이상 권장. 저장소 루트에서:

```sh
cd week03/shopping-mall
npm install
npm run dev
```

터미널에 표시된 로컬 주소를 브라우저에서 엽니다.

```sh
npm run typecheck
npm run build
npm run preview
```

## 데이터 흐름

- API: https://dummyjson.com/docs/products (키 불필요, 샘플 상품 데이터)
- `src/api/products.ts`: `limit=12`, `skip`으로 페이지 요청, HTTP 오류 처리, AbortSignal 전달.
- `src/main.tsx`: QueryClientProvider로 QueryClient 제공.
- `src/hooks/useProducts.ts`: useInfiniteQuery로 페이지별 응답/로딩/오류/캐시 관리.
- `initialPageParam=0`에서 시작하고, `skip + products.length < total`이면 다음 offset 반환.
  빈 페이지 또는 마지막 페이지에서는 undefined를 반환하여 추가 요청을 막습니다.
- `src/App.tsx`: data.pages를 합쳐 카드 grid 표시. 하단 IntersectionObserver가
  200px 이내에 들어오면 fetchNextPage 호출. 요청 중/오류/종료 시 관찰을 멈춥니다.
- 최초 로딩과 다음 페이지 로딩을 구분하며, 추가 요청 실패 시 기존 상품은 유지합니다.
  오류 시에만 재시도 버튼을 제공하고, 일반적인 페이지 추가는 스크롤로 자동 실행합니다.
- 가격은 USD로 표시합니다. 상품 API와 이미지 로딩에는 인터넷 연결이 필요합니다.

## 수동 확인

1. 처음 12개 상품의 이미지, 이름, 가격을 확인합니다.
2. 아래로 스크롤하여 Network에서 skip=12, 24, ... 순으로 요청되는지 확인합니다.
3. 마지막 상품까지 불러온 후 계속 스크롤해도 추가 요청이 없는지 확인합니다.
4. 네트워크를 끄고 다음 페이지를 요청해 기존 목록 유지/오류 표시를 확인합니다.
5. 네트워크를 복구하고 '다시 시도'로 이어서 불러오는지 확인합니다.

Git에는 이 폴더의 소스·설정·package-lock.json과 루트 .gitignore를 포함합니다.
node_modules, dist는 포함하지 않습니다.
