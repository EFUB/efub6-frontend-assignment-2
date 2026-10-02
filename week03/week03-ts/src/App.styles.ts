import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
`;

export const ProductCard = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 20px;
  border: 1px solid #eee;
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    margin: 0;
    color: #555;
    font-size: 14px;
  }

  .title {
    font-weight: bold;
    font-size: 16px;
    color: #222;
  }

  .price {
    color: #007bff;
    font-weight: bold;
  }
`;

export const LoadMoreButton = styled.div`
  text-align: center;
  padding: 20px;
  font-weight: bold;
  color: #666;
  background-color: #eaeaea;
  border-radius: 6px;
  margin-top: 20px;
`;