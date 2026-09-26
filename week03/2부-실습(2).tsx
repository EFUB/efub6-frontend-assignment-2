import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "./2부-실습(1)";

interface ProductsPage {
  products: { id: number; title: string; price: number; thumbnail: string }[];
  total: number;
  skip: number;
  limit: number;
}

const App = () => {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }): Promise<ProductsPage> => getPosts({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const { total, skip, limit } = lastPage;
      const currentPage = allPages.length - 1;
      return lastPage.products.length > 0 && skip + limit < total
        ? currentPage + 1
        : undefined;
    },
  });

  useEffect(() => {
    if (!target || !hasNextPage || isFetching || error) return;

    const onIntersect: IntersectionObserverCallback = ([entry], observer) => {
      if (entry?.isIntersecting) {
        observer.unobserve(entry.target);
        void fetchNextPage({ cancelRefetch: false });
      }
    };

    const observer = new IntersectionObserver(onIntersect, { threshold: 0.2 });
    observer.observe(target);
    return () => observer.disconnect();
  }, [target, hasNextPage, isFetching, error, fetchNextPage]);

  if (isFetching && !isFetchingNextPage) {
    return <div>fetching</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <>
      <div>{data?.pages.flatMap((page) => page.products).length ?? 0}개 상품</div>
      <div ref={setTarget} style={{ minHeight: 1 }} />
      {isFetchingNextPage && <div>fetching</div>}
    </>
  );
};

export default App;
