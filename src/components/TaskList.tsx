import React from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import styled from "styled-components";

import {
  Task as TaskProps,
  TaskReorderInput,
  UpdateTaskInput,
} from "../graphql/generated";
import { ExternalDraggableTask } from "./Calendar/ExternalDraggableTask";
import { Spacer } from "./Spacer";
import { Task } from "./Task";

interface Props {
  tasks: TaskProps[];
  updateTask: (uti: UpdateTaskInput) => void;
  taskReorder: (tasks: TaskReorderInput[]) => void;

  goTask: (id: string) => void;
}

/**
 * A list of Tasks
 */
export const TaskList = (props: Props) => {
  const { tasks, updateTask, taskReorder, goTask } = props;

  const onDragEnd = (result: DropResult) => {
    const destinationIndex = result.destination?.index;
    if (destinationIndex === undefined) return;
    const sourceIndex = result.source.index;
    const [begin, end, reverse] =
      destinationIndex > sourceIndex
        ? [sourceIndex, destinationIndex, true]
        : [destinationIndex, sourceIndex, false];
    const taskSlice = tasks
      .slice(begin, end + 1)
      .map(({ id, order }) => ({ id, order }));
    const taskSliceWithOrder = reverse ? taskSlice.reverse() : taskSlice;
    taskReorder(taskSliceWithOrder);
  };

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((t, i) => (
                <Draggable key={t.id} draggableId={t.id} index={i}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <>
                        <ExternalDraggableTask task={t}>
                          <Task
                            key={i}
                            {...t}
                            updateTask={updateTask}
                            goTask={goTask}
                          />
                        </ExternalDraggableTask>
                        <Spacer spacing="6" />
                      </>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};

const Container = styled.div`
  overflow: auto;
`;
