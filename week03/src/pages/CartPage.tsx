import { Link } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import StatusBox from "../components/StatusBox";
import { useCart } from "../context/CartContext";
import { colors, formatPrice } from "../styles/theme";

const CartPage = () => {
  const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <>
      <Header />
      <Page>
        <Title>장바구니</Title>
        {items.length === 0 ? (
          <StatusBox>
            담긴 상품이 없습니다.
            <br />
            <HomeLink to="/">쇼핑 계속하기</HomeLink>
          </StatusBox>
        ) : (
          <Layout>
            <List>
              {items.map((item) => (
                <Item key={item.id}>
                  <Thumb src={item.thumbnail} alt={item.title} />
                  <Meta>
                    <ItemTitle to={`/products/${item.id}`}>{item.title}</ItemTitle>
                    <Price>{formatPrice(item.price)}</Price>
                    <Quantity>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </Quantity>
                  </Meta>
                  <Right>
                    <Sum>{formatPrice(item.price * item.quantity)}</Sum>
                    <Remove type="button" onClick={() => removeItem(item.id)}>
                      삭제
                    </Remove>
                  </Right>
                </Item>
              ))}
            </List>
            <Summary>
              <SummaryTitle>주문 요약</SummaryTitle>
              <Row>
                <span>상품 금액</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </Row>
              <Row>
                <span>배송비</span>
                <strong>무료</strong>
              </Row>
              <Total>
                <span>결제 예정</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </Total>
              <Checkout type="button">주문하기</Checkout>
              <Clear type="button" onClick={clearCart}>
                장바구니 비우기
              </Clear>
            </Summary>
          </Layout>
        )}
      </Page>
      <Footer />
    </>
  );
};

export default CartPage;

const Page = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 28px 24px 40px;
`;

const Title = styled.h1`
  margin: 0 0 24px;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.03em;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  margin-top: 12px;
  color: ${colors.ink};
  font-weight: 700;
`;

const Layout = styled.section`
  display: grid;
  grid-template-columns: 1.4fr 0.8fr;
  gap: 24px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Item = styled.article`
  display: grid;
  grid-template-columns: 96px 1fr auto;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid ${colors.line};
`;

const Thumb = styled.img`
  width: 96px;
  height: 96px;
  object-fit: contain;
  background: ${colors.surface};
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const ItemTitle = styled(Link)`
  color: ${colors.ink};
  font-weight: 700;
  text-decoration: none;
`;

const Price = styled.span`
  color: ${colors.muted};
  font-size: 14px;
`;

const Quantity = styled.div`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  border: 1px solid ${colors.line};

  button,
  span {
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    border: none;
    background: transparent;
  }

  button {
    cursor: pointer;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;

const Sum = styled.strong`
  font-size: 16px;
`;

const Remove = styled.button`
  border: none;
  background: transparent;
  color: ${colors.muted};
  cursor: pointer;
`;

const Summary = styled.aside`
  height: fit-content;
  padding: 24px;
  background: ${colors.surface};
`;

const SummaryTitle = styled.h2`
  margin: 0 0 20px;
  font-size: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  color: ${colors.muted};
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  margin: 16px 0 20px;
  border-top: 1px solid ${colors.line};
  font-size: 18px;
`;

const Checkout = styled.button`
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 999px;
  background: ${colors.ink};
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`;

const Clear = styled.button`
  width: 100%;
  margin-top: 10px;
  border: none;
  background: transparent;
  color: ${colors.muted};
  cursor: pointer;
`;
