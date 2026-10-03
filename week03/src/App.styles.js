import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 16px;
`;

export const Header = styled.h1`
  grid-column: 1 / -1;
  margin: 0 0 8px;
  font-size: 36px;
  text-align: center;
  font-weight: 700;
  color: #1b5e20;
`;

export const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid #c8e6c9;
  border-radius: 12px;
  background-color: #ffffff;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(27, 94, 32, 0.18);
  }
`;

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  flex-shrink: 0;
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-align: center;

  p {
    margin: 0;
    font-size: 14px;
    color: #3e6b47;
  }

  p:first-child {
    font-size: 15px;
    font-weight: 700;
    color: #1b4d2a;
    margin-bottom: 4px;
  }
`;

export const LoadMoreButton = styled.button`
  grid-column: 1 / -1;
  width: 100%;
  padding: 14px 0;
  margin-top: 8px;
  border: none;
  border-radius: 10px;
  background-color: #2e7d32;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #1b5e20;
  }

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`;
