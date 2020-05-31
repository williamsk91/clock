import React from "react";
import styled from "styled-components";

interface Props {
  text: string;
  checked: boolean;
  onClick: (c: boolean) => void;
}

/**
 * A round checkbox with content inside it.
 */
export const RoundCheck = (props: Props) => {
  const { text, checked, onClick } = props;
  return (
    <Container checked={checked} onClick={() => onClick(!checked)}>
      {text}
    </Container>
  );
};

const Container = styled.div<{ checked: boolean }>`
  width: 26px;
  height: 26px;

  background: ${p => (p.checked ? "#137cbd" : "initial")};
  color: ${p => (p.checked ? "white" : "initial")};
  border-radius: 10000000px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;
