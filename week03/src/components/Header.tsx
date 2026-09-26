import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "../context/CartContext";
import { colors } from "../styles/theme";

interface HeaderProps {
  searchValue?: string;
  onSearch?: (value: string) => void;
}

const Header = ({ searchValue, onSearch }: HeaderProps) => {
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(searchValue ?? "");

  useEffect(() => {
    if (searchValue !== undefined) {
      setKeyword(searchValue);
    }
  }, [searchValue]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextKeyword = keyword.trim();
    if (onSearch) {
      onSearch(nextKeyword);
      return;
    }
    navigate(nextKeyword ? `/?q=${encodeURIComponent(nextKeyword)}` : "/");
  };

  return (
    <Bar>
      <Inner>
        <Logo to="/">상품</Logo>
        <SearchForm onSubmit={handleSubmit}>
          <SearchInput
            value={keyword}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setKeyword(event.target.value)
            }
            placeholder="검색"
          />
        </SearchForm>
        <CartLink to="/cart">
          Cart
          {itemCount > 0 && <Badge>{itemCount}</Badge>}
        </CartLink>
      </Inner>
    </Bar>
  );
};

export default Header;

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${colors.bg};
  border-bottom: 1px solid ${colors.line};
`;

const Inner = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 24px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 14px 24px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr auto;
    gap: 12px;
  }
`;

const Logo = styled(Link)`
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${colors.ink};
  text-decoration: none;
`;

const SearchForm = styled.form`
  @media (max-width: 720px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: min(420px, 100%);
  height: 36px;
  padding: 0 14px;
  border: 1px solid ${colors.line};
  border-radius: 999px;
  background: ${colors.surface};
  color: ${colors.ink};
  font-size: 13px;
  outline: none;

  &:focus {
    background: ${colors.bg};
    border-color: ${colors.ink};
  }
`;

const CartLink = styled(Link)`
  position: relative;
  color: ${colors.ink};
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
`;

const Badge = styled.span`
  position: absolute;
  top: -8px;
  right: -12px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 999px;
  background: ${colors.ink};
  color: #fff;
  font-size: 10px;
  line-height: 16px;
  text-align: center;
`;
