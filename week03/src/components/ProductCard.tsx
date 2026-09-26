import { MouseEvent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "../context/CartContext";
import {
  colors,
  formatCategory,
  formatPrice,
  getSalePrice,
} from "../styles/theme";
import { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const salePrice = getSalePrice(product.price, product.discountPercentage);
  const hasDiscount = product.discountPercentage >= 5;

  const handleAdd = (event: MouseEvent) => {
    event.preventDefault();
    addItem(product);
  };

  return (
    <Card to={`/products/${product.id}`}>
      <ThumbWrap>
        <Thumb src={product.thumbnail} alt={product.title} />
      </ThumbWrap>
      <Category>{formatCategory(product.category)}</Category>
      <Title>{product.title}</Title>
      <Bottom>
        <Price>{formatPrice(hasDiscount ? salePrice : product.price)}</Price>
        <AddButton type="button" onClick={handleAdd}>
          Buy now
        </AddButton>
      </Bottom>
    </Card>
  );
};

export default ProductCard;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
`;

const ThumbWrap = styled.div`
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  margin-bottom: 14px;
  background: ${colors.surface};
  border-radius: 8px;
`;

const Thumb = styled.img`
  width: 68%;
  height: 68%;
  object-fit: contain;
`;

const Category = styled.span`
  color: ${colors.muted};
  font-size: 12px;
`;

const Title = styled.h3`
  display: -webkit-box;
  margin: 6px 0 14px;
  min-height: 40px;
  overflow: hidden;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.45;
  color: ${colors.ink};
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
`;

const Price = styled.strong`
  font-size: 14px;
  font-weight: 600;
`;

const AddButton = styled.button`
  height: 30px;
  padding: 0 12px;
  border: none;
  border-radius: 999px;
  background: ${colors.ink};
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
`;
