import React, { useState, useEffect, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import * as S from "./App.styles";

// 1. 상품 데이터 타입 정의
interface Product {
  id: number;
  title: string;
  price: number;
  stock: number;
  images: string[];
}

// 2. API 응답 데이터 타입 정의 (DummyJSON 구조)
interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// 한 번에 불러오는 데이터의 개수 정의
export const DATA_LIMIT = 5;

// getPosts (상품 데이터 페칭) 함수 정의 (TypeScript 제네릭 적용)
export const getPosts = async ({ pageParam = 0 }: { pageParam?: unknown }): Promise<ProductResponse> => {
  const response = await fetch(
    `https://dummyjson.com/products?limit=${DATA_LIMIT}&skip=${pageParam}`
  );
  return response.json();
};

const App: React.FC = () => {
  // Intersection Observer가 감시하는 target 관리 (HTMLDivElement 또는 null)
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<ProductResponse, Error>({
    queryKey: ["products"],
    queryFn: getPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { total, skip, limit } = lastPage;
      return skip + limit < total ? skip + limit : undefined;
    },
  });

  // 콜백함수 onIntersect 정의 (useCallback으로 감싸서 훅 의존성 경고 해결)
  const onIntersect: IntersectionObserverCallback = useCallback(
    async ([entry], observer) => {
      if (entry.isIntersecting && hasNextPage) {
        observer.unobserve(entry.target);
        await fetchNextPage();
        observer.observe(entry.target);
      }
    },
    [hasNextPage, fetchNextPage]
  );

  // useEffect로 옵저버 관리 (조건문보다 상단에 위치해야 함!)
  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.2 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, onIntersect]);

  // 첫 번째 페이지 로딩 중일 때 (모든 훅보다 아래에 위치해야 함)
  if (isFetching && !isFetchingNextPage) {
    return <div>로딩 중입니다...</div>;
  }

  // 에러 발생 시
  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  return (
    <S.Container>
      <h1>🛍️ EFUB 쇼핑몰</h1>
      {data?.pages.map((group, idx) => (
        <React.Fragment key={idx}>
          {group.products.map(({ id, title, price, stock, images }: Product) => (
            <S.ProductCard key={`product_${id}`}>
              <S.ProductImage src={images[0]} alt={title} />
              <S.ProductDetails>
                <p className="title">{title}</p>
                <p>품번: {id}</p>
                <p>재고: {stock}개</p>
                <p className="price">가격: ${price}</p>
              </S.ProductDetails>
            </S.ProductCard>
          ))}
        </React.Fragment>
      ))}

      {/* 무한 스크롤 타겟 요소 (ref에 setTarget 바인딩) */}
      <S.LoadMoreButton ref={setTarget}>
        {hasNextPage ? "다음 아이템 불러오기 중..." : "마지막 아이템입니다."}
      </S.LoadMoreButton>
    </S.Container>
  );
};

export default App;
