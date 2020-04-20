import styled from "styled-components";

const Title = styled.h1`
  font-size: 36px;
  color: ${p => p.theme.text.title};

  margin: 0;
`;

const SubTitle = styled.p`
  font-size: 18px;
  color: ${p => p.theme.text.title};

  margin: 0;
`;

export const Text = { Title, SubTitle };
