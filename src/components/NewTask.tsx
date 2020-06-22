import React, { useState } from "react";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styled from "styled-components";

interface Props {
  createTask: (title: string) => void;
}

/**
 * Create a new task by passing in the title of the task.
 */
export const NewTask = (props: Props) => {
  const { createTask } = props;

  const [title, setTitle] = useState("");

  return (
    <Container>
      <Input
        placeholder="Add a task"
        value={title}
        onChange={e => setTitle(e.currentTarget.value)}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            title !== "" && createTask(title);
            setTitle("");
          }
        }}
      />
      <AddButton
        type="link"
        icon={<PlusSquareOutlined />}
        onClick={() => createTask(title)}
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

  &:focus {
    outline: none;
  }
`;

const AddButton = styled(Button)`
  transition: opacity 0.1s ease-in;
  opacity: 0;
  ${Container}:hover & {
    opacity: 100;
  }
`;
