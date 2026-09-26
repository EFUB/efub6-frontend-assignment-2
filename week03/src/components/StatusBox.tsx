import { ReactNode } from "react";
import styled from "styled-components";
import { colors } from "../styles/theme";

const StatusBox = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

export default StatusBox;

const Box = styled.div`
  display: grid;
  place-items: center;
  min-height: 200px;
  padding: 32px;
  background: ${colors.surface};
  color: ${colors.muted};
  text-align: center;
  line-height: 1.6;
  font-size: 14px;
`;
