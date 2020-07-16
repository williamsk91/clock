import React, { FC, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button } from "antd";
import styled from "styled-components";

import { defaultEventColor } from "./Calendar/styles";
import { useCalendarContext } from "./context/CalendarContext";
import { formatDatetime } from "./datetime";
import { Spacer } from "./Spacer";
import { TaskTitleInput, TimeText } from "./Task";

interface Props {
  onCancel: () => void;
  onConfirm: (
    title: string,
    start: Date,
    end: Date,
    includeTime: boolean
  ) => void;
}

interface LocationState {
  date?: {
    start: Date;
    end: Date;
    includeTime: boolean;
  };
}

/**
 * A simple card with text input as title of an event with
 *  date underneath. A user can then confirm to create the
 *  task or cancel.
 */
export const NewCalendarTask: FC<Props> = (props: Props) => {
  const { onCancel, onConfirm } = props;
  const history = useHistory();
  const location = useLocation<LocationState>();
  const { api } = useCalendarContext();

  const [title, setTitle] = useState("");

  const date = location.state.date;
  if (!date) {
    history.push("/");
    return null;
  }
  const { start, end, includeTime } = date;

  return (
    <Container>
      <Card>
        <TaskContainer>
          <TaskTitleInput
            placeholder="title"
            done={false}
            color={defaultEventColor}
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <TimeText>
            {formatDatetime(start, end, undefined, includeTime)}
          </TimeText>
        </TaskContainer>
        <Spacer spacing="12" />
        <ButtonGroup>
          <Button
            onClick={() => {
              onCancel();
              api?.unselect();
            }}
            type="text"
            danger
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (title !== "") {
                onConfirm(title, start, end, includeTime);
                api?.unselect();
              }
            }}
            type="primary"
          >
            Confirm
          </Button>
        </ButtonGroup>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Card = styled.div`
  width: 100%;
  padding: 24px;
  box-sizing: border-box;

  background: #ffffff;
`;

const TaskContainer = styled.div`
  min-width: 250px;

  height: 48px;
  width: 100%;

  /* 1px larger than calendar's events because this is including border */
  padding: 4px 5px;
  border-radius: 3px;

  background: ${defaultEventColor};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;
