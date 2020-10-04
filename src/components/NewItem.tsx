import React, { useState } from "react";

import { PlusSquareOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styled from "styled-components";

interface Props {
  placeholder: string;
  createItem: (title: string) => void;
}

/**
 * Create a new task / list by passing in the title of the task.
 */
export const NewItem = (props: Props) => {
  const { placeholder, createItem } = props;

  const [title, setTitle] = useState("");

  return (
    <Container>
      <Input
        placeholder={placeholder}
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            title !== "" && createItem(title);
            setTitle("");
          }
        }}
      />
      <AddButton
        type="text"
        icon={<AddIcon />}
        onClick={() => createItem(title)}
      />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 33px;
  grid-gap: 12px;
  align-items: center;
`;

const Input = styled.input`
  border: 0;

  padding: 0;
  margin-left: 24px;
  margin-bottom: 1px;

  font-size: 16px;

  background: transparent;

  :focus {
    outline: none;
  }
`;

const AddButton = styled(Button)`
  width: 24px;
  height: 24px;

  margin-top: 3px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #828282;
  :hover {
    color: #828282;
  }

  transition: opacity 0.1s ease-in;
  opacity: 0;
  ${Container}:hover & {
    opacity: 100;
  }
`;

const AddIcon = styled(PlusSquareOutlined)`
  font-size: 24px;
`;
