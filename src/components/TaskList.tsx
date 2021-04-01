import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import styled from "styled-components";

import {
  List,
  Task as TaskProps,
  TaskReorderInput,
  UpdateTaskInput,
} from "../graphql/generated";
import { ExternalDraggableTask } from "./Calendar/ExternalDraggableTask";
import { EventColor } from "./Calendar/styles";
import { Spacer } from "./Spacer";
import { Task } from "./Task";

interface Props {
  list: List;
  tasks: TaskProps[];
  updateTask: (uti: UpdateTaskInput) => void;
  taskReorder: (tasks: TaskReorderInput[]) => void;

  onClickSetting: (id: string) => void;
}

/**
 * A list of Tasks
 */
export const Tasks = (props: Props) => {
  const { list, updateTask, taskReorder, onClickSetting } = props;

  const tasks = props.tasks.sort((a, b) => a.order - b.order);

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
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getStyle(provided.draggableProps.style, snapshot)}
                    >
                      <>
                        <ExternalDraggableTask list={list} task={t}>
                          <Task
                            listId={list.id}
                            listColor={list.color as EventColor | null}
                            key={i}
                            {...t}
                            updateTask={updateTask}
                            onClickSetting={onClickSetting}
                          />
                        </ExternalDraggableTask>
                        <Spacer spacing="12" />
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

/**
 * Skips drop animation
 * https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/drop-animation.md#skipping-the-drop-animation
 */
function getStyle(style: any, snapshot: any) {
  if (!snapshot.isDropAnimating) {
    return style;
  }
  return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: `0.001s`,
  };
}
