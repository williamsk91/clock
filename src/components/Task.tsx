import { Color, colors } from "../styles/colors";
import React, { FC } from "react";

import { DatePicker } from "./DatePicker";
import { Task as TaskProps } from "../graphql/generated";
import styled from "styled-components";

interface IProp extends TaskProps {
  setDone: (d: boolean) => void;
  setStart: (d: string | null) => void;
  setIncludeTime: (it: boolean) => void;
  setTitle: (t: string) => void;
}

/**
 * A single task
 */
export const Task: FC<IProp> = props => {
  const {
    done,
    setDone,
    title,
    setTitle,
    start,
    setStart,
    includeTime,
    setIncludeTime
  } = props;

  const updateDone = () => {
    setDone(!done);
  };

  const isDone: boolean = !!done;

  return (
    <Container>
      <Banner color="red" />
      <Input
        done={!!isDone}
        value={title}
        onChange={e => setTitle(e.currentTarget.value)}
        onKeyDown={e => {
          if (e.ctrlKey && e.keyCode === 13) {
            updateDone();
          }
        }}
      />
      <Icons>
        <Checkbox done={!!done} />
      </Icons>
    </Container>
  );
};

const Container = styled.div`
  height: 48px;

  display: grid;
  grid-template-columns: 3px auto min-content;
  align-items: center;
  grid-gap: 6px;

  position: relative;
`;

const Banner = styled.div<{ color: Color }>`
  width: 3px;
  height: 42px;

  background: ${p => colors[p.color]};
`;

const Icons = styled.div``;

const Input = styled.input<{ done: boolean }>`
  border: 0;

  text-decoration: ${p => (p.done ? "line-through" : "initials")};
  color: ${p => (p.done ? p.theme.text.disabled : p.theme.text.main)};
`;

const Checkbox = styled.div<{ done: boolean }>`
  width: 16px;
  height: 16px;

  border: 2px solid ${p => p.theme.text.main};
  background: ${p => (p.done ? p.theme.text.main : "transparent")};
  background-clip: padding-box;
`;
