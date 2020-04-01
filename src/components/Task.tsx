import React, { FC } from "react";

import { DatePicker } from "./DatePicker";
import { Task as TaskProps } from "../graphql/generatedGraphql";
import styled from "styled-components";

interface IProp extends TaskProps {
  setDone: (d: string | null) => void;
  setStart: (d: string | null) => void;
  setTitle: (t: string) => void;
}

/**
 * A single task
 */
export const Task: FC<IProp> = props => {
  const { done, setDone, title, setTitle, start, setStart } = props;

  const updateDone = () => {
    if (done) {
      setDone(null);
    } else {
      setDone(new Date().toISOString());
    }
  };

  return (
    <Container>
      <Checkbox done={!!done} onClick={updateDone} />
      <Input
        value={title}
        onChange={e => setTitle(e.currentTarget.value)}
        onKeyDown={e => {
          if (e.ctrlKey && e.keyCode === 13) {
            updateDone();
          }
        }}
      />
      <DatePicker
        start={start ? new Date(start) : undefined}
        setStart={d => (d ? setStart(d.toISOString()) : setStart(null))}
      />
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
