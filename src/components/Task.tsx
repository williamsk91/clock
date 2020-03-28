import React, { FC } from "react";

import { DatePicker } from "./DatePicker";
import styled from "styled-components";

interface IProp {
  id: string;
  done: boolean;
  setDone: (d: boolean) => void;

  start?: Date;
  setStart: (d?: Date) => void;

  title: string;
  setTitle: (t: string) => void;
}

/**
 * A single task
 */
export const Task: FC<IProp> = props => {
  const { done, setDone, title, setTitle, start, setStart } = props;

  return (
    <Container>
      <Checkbox
        done={done}
        onClick={() => {
          setDone(!done);
        }}
      />
      <Input
        value={title}
        onChange={e => setTitle(e.currentTarget.value)}
        onKeyDown={e => {
          if (e.ctrlKey && e.keyCode === 13) {
            setDone(!done);
          }
        }}
      />
      <DatePicker start={start} setStart={setStart} />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-areas: "box text date";
  grid-template-columns: 24px 1fr auto;

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
