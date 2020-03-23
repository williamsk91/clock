import React, { FC } from "react";

import styled from "styled-components";

interface IProp {
  done: boolean;
  setDone: (d: boolean) => void;

  text: string;
  setText: (t: string) => void;
}

/**
 * A single task
 */
export const Task: FC<IProp> = props => {
  const { done, setDone, text, setText } = props;

  return (
    <Container>
      <Checkbox
        done={done}
        onClick={() => {
          setDone(!done);
        }}
      />
      <Input
        value={text}
        onChange={e => setText(e.currentTarget.value)}
        onKeyDown={e => {
          if (e.ctrlKey && e.keyCode === 13) {
            setDone(!done);
          }
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-areas: "box text";
  grid-template-columns: 24px auto;

  align-items: center;
`;

const Checkbox = styled.div<{ done: boolean }>`
  grid-area: box;

  width: 16px;
  height: 16px;

  border: 2px solid ${p => p.theme.text.main};
  background: ${p => (p.done ? p.theme.text.main : "transparent")};
  background-clip: padding-box;
`;

const Input = styled.input`
  grid-area: text;

  border: 0;
`;
