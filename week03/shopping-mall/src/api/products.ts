export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
}

export interface ProductsPage {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const PAGE_SIZE = 12;

export async function getProducts(skip: number, signal: AbortSignal): Promise<ProductsPage> {
  const response = await fetch(
    `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}&select=title,price,thumbnail,category`,
    { signal },
  );
  if (!response.ok) {
    throw new Error(`상품 요청에 실패했습니다. (HTTP ${response.status})`);
  }
  return response.json();
}

// 실제 받은 개수로 다음 offset을 계산하여 마지막의 불완전한 페이지도 포함합니다.
export function getNextSkip(lastPage: ProductsPage): number | undefined {
  const nextSkip = lastPage.skip + lastPage.products.length;
  return lastPage.products.length > 0 && nextSkip < lastPage.total
    ? nextSkip
    : undefined;
}
