import { Product, ProductListFilters, ProductsResponse } from "../types/product";

export const PAGE_SIZE = 12;
const BASE_URL = "https://dummyjson.com";

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: ProductListFilters) =>
    [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  categories: () => [...productKeys.all, "categories"] as const,
};

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("상품 데이터를 불러오지 못했습니다.");
  }
  return response.json();
};

export const getProducts = async ({
  skip,
  category,
  q,
}: {
  skip: number;
  category: string;
  q: string;
}): Promise<ProductsResponse> => {
  const params = new URLSearchParams({
    limit: String(PAGE_SIZE),
    skip: String(skip),
  });

  if (q) {
    params.set("q", q);
    return fetchJson<ProductsResponse>(
      `${BASE_URL}/products/search?${params.toString()}`
    );
  }

  if (category) {
    return fetchJson<ProductsResponse>(
      `${BASE_URL}/products/category/${category}?${params.toString()}`
    );
  }

  return fetchJson<ProductsResponse>(
    `${BASE_URL}/products?${params.toString()}`
  );
};

export const getProduct = (id: string) =>
  fetchJson<Product>(`${BASE_URL}/products/${id}`);

export const getCategories = () =>
  fetchJson<string[]>(`${BASE_URL}/products/category-list`);
