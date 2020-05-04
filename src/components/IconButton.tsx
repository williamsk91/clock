import { Button } from "antd";
import styled from "styled-components";

/**
 * Button with icon as its main label
 */
export const IconButton = styled(Button)`
  &,
  &:hover,
  &:focus {
    color: ${p => p.theme.text.main};
    background: transparent;
  }
`;
