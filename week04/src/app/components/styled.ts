"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

// 레이아웃

export const Header = styled.header`
  text-align: center;
`;

export const HeaderInner = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 24px;
`;

export const Logo = styled(Link)`
  font-size: 30px;
  font-weight: 900;
`;

export const Main = styled.main`
  max-width: 1024px;
  margin: 0 auto;
  padding: 40px 24px;
`;

// 홈 화면

export const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

export const Card = styled(Link)`
  display: block;
  overflow: hidden;
  border-radius: 12px;
  background: #18181b;
`;

export const PosterBox = styled.div`
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
`;

export const Poster = styled(Image)`
  object-fit: cover;
`;

export const CardBody = styled.div`
  padding: 16px;
`;

export const CardTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const CardSport = styled.p`
  margin-top: 4px;
  font-size: 14px;
  color: #a1a1aa;
`;

// 상세 화면

export const Detail = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  ${PosterBox} {
    border-radius: 12px;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 900;
`;

export const Meta = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px 24px;

  dt {
    color: #a1a1aa;
  }
`;

export const Summary = styled.p`
  line-height: 1.7;
  color: #d4d4d8;
`;

// 북마크 버튼

export const Button = styled.button<{ $active: boolean }>`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  background: ${({ $active }) => ($active ? "#fbbf24" : "#27272a")};
  color: ${({ $active }) => ($active ? "#09090b" : "#f4f4f5")};
`;
