import React, { FC, useEffect, useRef } from "react";

import { ThirdPartyDraggable } from "@fullcalendar/interaction";

import { List, Task } from "../../graphql/generated";
import { taskToEventInput } from "./Calendar";

interface Props {
  list: List;
  task: Task;
}

/**
 * Wraps children with a container that can be dragged to the calendar.
 */
export const ExternalDraggableTask: FC<Props> = (props) => {
  const { children, list, task } = props;

  const taskContainerId = `task-container-${task.id}`;

  const taskRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!taskRef.current) return;
    const eventData = { ...taskToEventInput(list, task), create: true };
    new ThirdPartyDraggable(taskRef.current, {
      mirrorSelector: `#${taskContainerId}`,
      eventData,
    });
  }, [taskRef, taskContainerId, list, task]);

  return (
    <div ref={taskRef} id={taskContainerId}>
      {children}
    </div>
  );
};
