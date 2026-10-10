import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import StatusBox from "../components/StatusBox";
import { useCart } from "../context/CartContext";
import { useProduct } from "../hooks/useProduct";
import {
  colors,
  formatCategory,
  formatPrice,
  getSalePrice,
} from "../styles/theme";

const ProductDetailPage = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { data: product, isError, isPending } = useProduct(id);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (isPending) {
    return (
      <>
        <Header />
        <Page>
          <StatusBox>상품 정보를 불러오는 중입니다...</StatusBox>
        </Page>
        <Footer />
      </>
    );
  }

  if (isError || !product) {
    return (
      <>
        <Header />
        <Page>
          <StatusBox>존재하지 않거나 불러올 수 없는 상품입니다.</StatusBox>
        </Page>
        <Footer />
      </>
    );
  }

  const images = product.images.length > 0 ? product.images : [product.thumbnail];
  const salePrice = getSalePrice(product.price, product.discountPercentage);
  const hasDiscount = product.discountPercentage >= 5;

  const handleAdd = () => {
    addItem(product, quantity);
    navigate("/cart");
  };

  return (
    <>
      <Header />
      <Page>
        <Back to="/">← 목록으로</Back>
        <Layout>
          <Gallery>
            <MainImage src={images[activeImage]} alt={product.title} />
            {images.length > 1 && (
              <Thumbs>
                {images.map((image, index) => (
                  <ThumbButton
                    key={image}
                    type="button"
                    $active={index === activeImage}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={image} alt={`${product.title} ${index + 1}`} />
                  </ThumbButton>
                ))}
              </Thumbs>
            )}
          </Gallery>
          <Info>
            <Category>{formatCategory(product.category)}</Category>
            <Title>{product.title}</Title>
            {product.brand && <Brand>{product.brand}</Brand>}
            <Rating>★ {product.rating.toFixed(1)} · 재고 {product.stock}개</Rating>
            <PriceBlock>
              {hasDiscount && (
                <Origin>{formatPrice(product.price)}</Origin>
              )}
              <Price>
                {formatPrice(hasDiscount ? salePrice : product.price)}
              </Price>
              {hasDiscount && (
                <Discount>{Math.round(product.discountPercentage)}% OFF</Discount>
              )}
            </PriceBlock>
            <Description>{product.description}</Description>
            <Actions>
              <Quantity>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button type="button" onClick={() => setQuantity((prev) => prev + 1)}>
                  +
                </button>
              </Quantity>
              <AddButton type="button" onClick={handleAdd}>
                장바구니 담기
              </AddButton>
            </Actions>
          </Info>
        </Layout>
      </Page>
      <Footer />
    </>
  );
};

export default ProductDetailPage;

const Page = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 28px 24px 40px;
`;

const Back = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  color: ${colors.muted};
  text-decoration: none;
  font-size: 14px;
`;

const Layout = styled.section`
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 40px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const Gallery = styled.div``;

const MainImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  background: ${colors.surface};
`;

const Thumbs = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 12px;
`;

const ThumbButton = styled.button<{ $active: boolean }>`
  width: 72px;
  height: 72px;
  padding: 0;
  overflow: hidden;
  border: 1px solid ${({ $active }) => ($active ? colors.ink : colors.line)};
  background: ${colors.surface};
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Category = styled.span`
  color: ${colors.muted};
  font-size: 13px;
`;

const Title = styled.h1`
  margin: 8px 0 6px;
  font-size: clamp(26px, 4vw, 36px);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.2;
`;

const Brand = styled.p`
  margin: 0 0 8px;
  color: ${colors.muted};
`;

const Rating = styled.p`
  margin: 0 0 18px;
  color: ${colors.muted};
  font-size: 14px;
`;

const PriceBlock = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 20px;
`;

const Origin = styled.span`
  color: ${colors.muted};
  text-decoration: line-through;
`;

const Price = styled.strong`
  font-size: 32px;
`;

const Discount = styled.span`
  color: ${colors.muted};
  font-size: 13px;
`;

const Description = styled.p`
  margin: 0 0 28px;
  color: ${colors.muted};
  line-height: 1.7;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${colors.line};
  background: ${colors.bg};

  button,
  span {
    width: 44px;
    height: 48px;
    display: grid;
    place-items: center;
    border: none;
    background: transparent;
    font-size: 16px;
  }

  button {
    cursor: pointer;
  }
`;

const AddButton = styled.button`
  flex: 1;
  height: 48px;
  border: none;
  border-radius: 999px;
  background: ${colors.ink};
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;
