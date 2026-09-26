import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { getProducts, productKeys } from "../api/products";
import { ProductListFilters } from "../types/product";

export const useInfiniteProducts = (filters: ProductListFilters) => {
  return useInfiniteQuery({
    queryKey: productKeys.list(filters),
    queryFn: ({ pageParam }) =>
      getProducts({
        skip: pageParam,
        category: filters.category,
        q: filters.q,
      }),
    initialPageParam: 0,
    placeholderData: keepPreviousData,
    // 다음 요청의 skip. 더 불러올 상품이 없으면 undefined → hasNextPage=false
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.products.length;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
  });
};
