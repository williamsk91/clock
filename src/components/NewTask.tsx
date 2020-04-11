import React, { useState } from "react";

import styled from "styled-components";

interface Props {
  onCreate: (ttitle: string) => void;
}

/**
 * Create a new task by passing in the title of the task.
 */
export const NewTask = (props: Props) => {
  const { onCreate } = props;

  const [title, setTitle] = useState("");

  return (
    <Container>
      <Checkbox />
      <Input
        placeholder="Add a task"
        value={title}
        onChange={e => setTitle(e.currentTarget.value)}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            title !== "" && onCreate(title);
            setTitle("");
          }
        }}
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

const Checkbox = styled.div`
  grid-area: box;

  width: 16px;
  height: 16px;

  border: 2px solid ${p => p.theme.text.main};
  background: "transparent";
  background-clip: padding-box;
`;

const Input = styled.input`
  grid-area: text;
  border: 0;

  color: ${p => p.theme.text.disabled};
  :focus {
    color: ${p => p.theme.text.main};
  }
`;
