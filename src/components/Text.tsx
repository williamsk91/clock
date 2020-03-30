import styled from "styled-components";

export const Title = styled.h1<{ onClick?: () => void }>`
  font-size: 36px;
  color: ${p => p.theme.text.title};

  margin: 0;

  :hover {
    cursor: ${p => (p.onClick ? "pointer" : "initial")};
  }
`;
