import { BorderOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { Color, colors } from "../styles/colors";
import React, { FC } from "react";

import { IconButton } from "./IconButton";
import { Task as TaskProps } from "../graphql/generated";
import { Text } from "./Text";
import { formatDatetime } from "./datetime";
import styled from "styled-components";

interface IProp extends TaskProps {
  setDone: (d: boolean) => void;
  setStart: (d: Date | null) => void;
  setEnd: (d: Date | null) => void;
  setIncludeTime: (it: boolean) => void;
  setTitle: (t: string) => void;
}

/**
 * A single task
 */
export const Task: FC<IProp> = props => {
  const { done, setDone, title, setTitle, start, end, includeTime } = props;

  const updateDone = () => setDone(!done);
  console.log("start: ", start);
  return (
    <Container>
      <Banner color="red" />
      <Content>
        <Input
          done={done}
          value={title}
          onChange={e => setTitle(e.currentTarget.value)}
          onKeyDown={e => {
            if (e.ctrlKey && e.keyCode === 13) {
              updateDone();
            }
          }}
        />
        {start && (
          <Text.Sub>
            {formatDatetime(start, end ?? undefined, includeTime)}
          </Text.Sub>
        )}
      </Content>
      <IconButton
        type="link"
        onClick={updateDone}
        icon={done ? <CheckSquareOutlined /> : <BorderOutlined />}
      />
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input<{ done: boolean }>`
  border: 0;

  text-decoration: ${p => (p.done ? "line-through" : "initials")};
  color: ${p => (p.done ? p.theme.text.disabled : p.theme.text.main)};

  &:focus {
    outline: none;
  }
`;
