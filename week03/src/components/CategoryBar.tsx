import styled from "styled-components";
import { formatCategory, colors } from "../styles/theme";

interface CategoryBarProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

const CategoryBar = ({ categories, selected, onSelect }: CategoryBarProps) => {
  return (
    <Wrap>
      <Heading>Category</Heading>
      <Item
        type="button"
        $active={selected === ""}
        onClick={() => onSelect("")}
      >
        전체
      </Item>
      {categories.map((category) => (
        <Item
          key={category}
          type="button"
          $active={selected === category}
          onClick={() => onSelect(category)}
        >
          {formatCategory(category)}
        </Item>
      ))}
    </Wrap>
  );
};

export default CategoryBar;

const Wrap = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 168px;

  @media (max-width: 800px) {
    flex-direction: row;
    align-items: center;
    min-width: 0;
    overflow-x: auto;
    gap: 8px;
    padding-bottom: 4px;
  }
`;

const Heading = styled.p`
  margin: 0 0 10px;
  font-size: 13px;
  font-weight: 600;
  color: ${colors.ink};

  @media (max-width: 800px) {
    margin: 0 8px 0 0;
  }
`;

const Item = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 0;
  border: none;
  background: none;
  color: ${({ $active }) => ($active ? colors.ink : colors.muted)};
  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  text-align: left;
  cursor: pointer;
  white-space: nowrap;

  &::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    border: 1px solid ${({ $active }) => ($active ? colors.ink : "#cfcfcf")};
    background: ${({ $active }) => ($active ? colors.ink : "transparent")};
  }

  @media (max-width: 800px) {
    padding: 6px 10px;
    border: 1px solid ${({ $active }) => ($active ? colors.ink : colors.line)};
    border-radius: 999px;

    &::before {
      display: none;
    }
  }
`;
