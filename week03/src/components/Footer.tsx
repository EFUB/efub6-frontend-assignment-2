import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../styles/theme";

const Footer = () => {
  return (
    <Wrap>
      <Inner>
        <Copy>
          <Title>Ready to get your stuff?</Title>
          <Text>상품을 이어서 둘러보세요.</Text>
        </Copy>
        <Cta to="/">Shop now</Cta>
      </Inner>
    </Wrap>
  );
};

export default Footer;

const Wrap = styled.footer`
  margin-top: 72px;
  background: ${colors.ink};
  color: #fff;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 48px 24px;

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Copy = styled.div``;

const Title = styled.p`
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.03em;
`;

const Text = styled.p`
  margin: 0;
  color: #b3b3b3;
  font-size: 14px;
`;

const Cta = styled(Link)`
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding: 0 18px;
  border-radius: 999px;
  background: #fff;
  color: ${colors.ink};
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
`;
