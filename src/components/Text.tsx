import styled from "styled-components";

const Title = styled.h1`
  font-size: 36px;
  color: ${(p) => p.theme.text.title};

  margin: 0;
`;

const SubTitle = styled.p`
  font-size: 18px;
  color: ${(p) => p.theme.text.title};

  margin: 0;
`;

const Main = styled.p`
  font-size: 14px;
  color: ${(p) => p.theme.text.main};

  margin: 0;
`;

const Sub = styled.p`
  font-size: 10px;
  color: ${(p) => p.theme.text.main};

  margin: 0;
`;

// used for messages under illustrations
const Message = styled.p`
  font-size: 16px;
  color: ${(p) => p.theme.text.main};

  margin: 0;
`;

export const Text = { Title, SubTitle, Main, Sub, Message };
