import React, { FC, useEffect, useRef } from "react";
import { ThirdPartyDraggable } from "@fullcalendar/interaction";

import { Task } from "../../graphql/generated";
import { taskToEventInput } from "./Calendar";

interface Props {
  task: Task;
}

/**
 * Wraps children with a container that can be dragged to the calendar.
 */
export const ExternalDraggableTask: FC<Props> = (props) => {
  const { children, task } = props;

  const taskContainerId = `task-container-${task.id}`;

  const taskRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!taskRef.current) return;
    const eventData = { ...taskToEventInput(task), create: true };
    new ThirdPartyDraggable(taskRef.current, {
      mirrorSelector: `#${taskContainerId}`,
      eventData,
    });
  }, [taskRef, taskContainerId, task]);

  return (
    <div ref={taskRef} id={taskContainerId}>
      {children}
    </div>
  );
};
