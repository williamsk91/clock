import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { format } from "date-fns";
import styled from "styled-components";

import { Text } from "../Text";

interface Props {
  date: Date;
  onPrev: () => void;
  onNext: () => void;
  onNow: () => void;
}

export const Navigation = (props: Props) => {
  const { date, onPrev, onNow, onNext } = props;

  return (
    <Container>
      <Text.SubTitle>{format(date, "yyyy 'Week' w")}</Text.SubTitle>
      <ColoredButton onClick={onPrev} type="link" icon={<LeftOutlined />} />
      <ColoredButton onClick={onNow} type="link">
        now
      </ColoredButton>
      <ColoredButton onClick={onNext} type="link" icon={<RightOutlined />} />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: auto min-content min-content min-content;
`;

const ColoredButton = styled(Button)`
  color: ${p => p.theme.text.title};

  :hover,
  :active,
  :focus {
    color: ${p => p.theme.text.title};
  }
`;
