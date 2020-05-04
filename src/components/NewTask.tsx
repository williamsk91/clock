import React, { useState } from "react";

import { IconButton } from "./IconButton";
import { PlusSquareOutlined } from "@ant-design/icons";
import styled from "styled-components";

interface Props {
  onCreate: (title: string) => void;
}

/**
 * Create a new task by passing in the title of the task.
 */
export const NewTask = (props: Props) => {
  const { onCreate } = props;

  const [title, setTitle] = useState("");

  return (
    <Container>
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
      <IconButton
        type="link"
        onClick={() => onCreate(title)}
        icon={<PlusSquareOutlined />}
      />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 36px;
  align-items: center;

  background: white;
`;

const Input = styled.input`
  border: 0;
  padding: 12px;
`;
