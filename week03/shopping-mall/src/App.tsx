import { useEffect, useRef, useState } from 'react';
import type { Product } from './api/products';
import { useProducts } from './hooks/useProducts';

const priceFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

function ProductCard({ product }: { product: Product }) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <li className="product-card">
      <div className="product-image">
        {imageFailed ? <span>이미지를 준비 중입니다</span> : (
          <img src={product.thumbnail} alt={product.title} loading="lazy"
            onError={() => setImageFailed(true)} />
        )}
      </div>
      <div className="product-info">
        <h2>{product.title}</h2>
        <p className="price">{priceFormat.format(product.price)}</p>
      </div>
    </li>
  );
}

export default function App() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const {
    data, error, isPending, isError, isFetching, isFetchingNextPage,
    hasNextPage, fetchNextPage, refetch,
  } = useProducts();
  const products = data?.pages.flatMap((page) => page.products) ?? [];

  useEffect(() => {
    const target = sentinelRef.current;
    // 오류 시 자동 반복 요청을 멈추고 사용자의 재시도를 기다립니다.
    if (!target || !hasNextPage || isFetching || isError) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        void fetchNextPage({ cancelRefetch: false });
      }
    }, { rootMargin: '200px' });
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetching, isError, fetchNextPage]);

  return (
    <main>
        <section aria-labelledby="products-title">
          <h1 id="products-title">상품 목록</h1>
          {isPending && <p className="status" role="status">상품을 불러오는 중입니다…</p>}
          <ul className="product-grid">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </ul>
          {isError && (
            <div className="error" role="alert">
              <p>{products.length > 0 ? '다음 상품을 불러오지 못했습니다.' : '상품을 불러오지 못했습니다.'}</p>
              <p>{error.message} 인터넷 연결을 확인하고 다시 시도해 주세요.</p>
              <button disabled={isFetching} onClick={() => {
                if (data) void fetchNextPage({ cancelRefetch: false });
                else void refetch();
              }}>{isFetching ? '재시도 중…' : '다시 시도'}</button>
            </div>
          )}
          <div ref={sentinelRef} className="sentinel" aria-hidden="true" />
          <p className="status" role="status">
            {isFetchingNextPage ? '다음 상품을 불러오는 중입니다…'
              : data && !hasNextPage ? (products.length ? '모든 상품을 불러왔습니다.' : '등록된 상품이 없습니다.')
              : ''}
          </p>
        </section>
      </main>
  );
}
