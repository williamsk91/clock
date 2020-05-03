import { Button } from "antd";
import styled from "styled-components";

export const IconButton = styled(Button)`
  &,
  &:hover,
  &:focus {
    color: ${p => p.theme.text.main};
    background: transparent;
  }
`;
