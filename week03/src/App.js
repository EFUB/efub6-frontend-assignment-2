import React, { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import * as S from "./App.styles.js";

export const DATA_LIMIT = 8;
export const getPosts = async ({ pageParam = 0 }) => {
  const response = await fetch(
    `https://dummyjson.com/products?limit=${DATA_LIMIT}&skip=${pageParam * DATA_LIMIT}`,
  );
  return response.json();
};

const App = () => {
  const [target, setTarget] = useState(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const { total, skip, limit } = lastPage;
      const currentPage = allPages.length - 1;
      return total >= skip + limit * 2 ? currentPage + 1 : undefined;
    },
  });

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && hasNextPage) {
      observer.unobserve(entry.target);
      await fetchNextPage();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.2 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  if (isFetching && !isFetchingNextPage) {
    return <div>fetching</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <S.Container>
      <S.Header>Query shop</S.Header>
      {data.pages.map((group, idx) => (
        <React.Fragment key={idx}>
          {group.products.map(({ id, title, price, stock, images }) => (
            <S.ProductCard
              key={`product_${id}`}
              onClick={() => {
                if (window.confirm("구매하시겠습니까?")) {
                  window.alert("구매가 완료되었습니다");
                }
              }}
            >
              <S.ProductImage src={images[0]} alt="images" />
              <S.ProductDetails>
                <p>{title}</p>
                <p>품번: {id}</p>
                <p>재고: {stock}</p>
                <p>가격: ${price}</p>
              </S.ProductDetails>
            </S.ProductCard>
          ))}
        </React.Fragment>
      ))}
      <S.LoadMoreButton ref={setTarget}>
        {hasNextPage ? "더 아이템 불러오기" : "마지막 아이템"}
      </S.LoadMoreButton>
    </S.Container>
  );
};

export default App;
