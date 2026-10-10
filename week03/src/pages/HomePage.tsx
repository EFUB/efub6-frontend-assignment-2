import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import CategoryBar from "../components/CategoryBar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import StatusBox from "../components/StatusBox";
import { useCategories } from "../hooks/useCategories";
import { useInfiniteProducts } from "../hooks/useInfiniteProducts";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { colors } from "../styles/theme";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("q") ?? "";
  const [category, setCategory] = useState("");

  const filters = useMemo(
    () => ({ category: keyword ? "" : category, q: keyword }),
    [category, keyword]
  );

  const { data: categories = [] } = useCategories();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isPending,
  } = useInfiniteProducts(filters);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const setTarget = useIntersectionObserver(
    loadMore,
    Boolean(hasNextPage) && !isFetchingNextPage
  );

  const products = data?.pages.flatMap((page) => page.products) ?? [];
  const total = data?.pages[0]?.total ?? 0;

  const handleSearch = (value: string) => {
    setCategory("");
    setSearchParams(value ? { q: value } : {});
  };

  const handleCategory = (nextCategory: string) => {
    setCategory(nextCategory);
    setSearchParams({});
  };

  return (
    <>
      <Header searchValue={keyword} onSearch={handleSearch} />
      <Hero>
        <HeroWord>Shop</HeroWord>
      </Hero>
      <Main>
        <Toolbar>
          <Intro>
            <IntroTitle>쇼핑하는 곳</IntroTitle>
            <IntroCopy>
              {keyword
                ? `"${keyword}" 검색 결과 ${total}개`
                : `${total} products`}
            </IntroCopy>
          </Intro>
        </Toolbar>

        <ShopLayout $hasSidebar={!keyword}>
          {!keyword && (
            <CategoryBar
              categories={categories}
              selected={category}
              onSelect={handleCategory}
            />
          )}

          <Catalog>
            {isPending && <StatusBox>상품을 불러오는 중입니다...</StatusBox>}
            {isError && (
              <StatusBox>
                {error instanceof Error
                  ? error.message
                  : "상품을 불러오지 못했습니다."}
              </StatusBox>
            )}
            {!isPending && !isError && products.length === 0 && (
              <StatusBox>조건에 맞는 상품이 없습니다.</StatusBox>
            )}

            <Grid>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Grid>

            <Sentinel ref={setTarget}>
              {isFetchingNextPage
                ? "다음 상품을 불러오는 중..."
                : hasNextPage
                  ? "스크롤하면 더 불러옵니다"
                  : products.length > 0
                    ? "마지막 상품입니다"
                    : ""}
            </Sentinel>
          </Catalog>
        </ShopLayout>
      </Main>
      <Footer />
    </>
  );
};

export default HomePage;

const Hero = styled.section`
  display: grid;
  place-items: center;
  height: 280px;
  background:
    linear-gradient(rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0.18)),
    url("https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1800&q=70")
      center / cover no-repeat;
  background-color: #d8d8d8;
`;

const HeroWord = styled.h1`
  margin: 0;
  color: #fff;
  font-size: clamp(88px, 18vw, 168px);
  font-weight: 600;
  letter-spacing: -0.07em;
  line-height: 0.85;
`;

const Main = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 36px 24px 40px;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 28px;
`;

const Intro = styled.div``;

const IntroTitle = styled.h2`
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.03em;
`;

const IntroCopy = styled.p`
  margin: 0;
  color: ${colors.muted};
  font-size: 13px;
`;

const ShopLayout = styled.div<{ $hasSidebar: boolean }>`
  display: grid;
  grid-template-columns: ${({ $hasSidebar }) =>
    $hasSidebar ? "188px minmax(0, 1fr)" : "1fr"};
  gap: 40px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const Catalog = styled.div`
  min-width: 0;
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px 20px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Sentinel = styled.div`
  min-height: 48px;
  margin-top: 36px;
  color: ${colors.muted};
  font-size: 13px;
  text-align: center;
`;
