import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";

import { useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  BookOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  HighlightOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { Button, Divider, Popconfirm, Switch } from "antd";
import styled from "styled-components";

import { Text } from "../../components";
import { EventColor } from "../../components/Calendar/styles";
import { parseDate } from "../../components/datetime";
import { Error } from "../../components/flow/Error";
import { Loading } from "../../components/flow/Loading";
import { Editor } from "../../components/Note/Editor";
import { homeListRoute, homeTaskSettingRoute } from "../../components/route";
import { ColorSelect } from "../../components/Settings/ColorSelect";
import { DateTimeRangePicker } from "../../components/Settings/DateTimeRangePicker";
import { ListSelect } from "../../components/Settings/ListSelect";
import { RepeatSelect } from "../../components/Settings/RepeatSelect";
import { Spacer } from "../../components/Spacer";
import { Task } from "../../components/Task";
import { demuxUpdateTask } from "../../components/utils/task";
import { useSetNote } from "../../data/mutation/note";
import { useUpdateRepeat } from "../../data/mutation/repeat";
import {
  useDeleteTask,
  useUpdateTask,
  useUpdateTaskList,
} from "../../data/mutation/task";
import {
  List,
  Task as TaskType,
  UpdateTaskInput,
  UpsertNoteInput,
  UpsertRepeatInput,
  useTaskQuery,
} from "../../graphql/generated";

/**
 * Query task data and pass to `TaskSidebar`.
 */
export const TaskSidebarWithData = () => {
  const { listId, taskId } = useParams<{ listId: string; taskId: string }>();
  const history = useHistory();

  const { data, loading, error } = useTaskQuery({
    variables: { listId, taskId },
  });

  const updateTask = useUpdateTask();
  const updateRepeat = useUpdateRepeat();
  const setNote = useSetNote();
  const updateTaskList = useUpdateTaskList();
  const updateTaskListWithRedirect = (id: string, newListId: string) => {
    updateTaskList(id, newListId, listId);
    history.push(homeTaskSettingRoute(newListId, id));
  };

  const deleteTask = useDeleteTask({
    onCompleted: () => history.push(homeListRoute(listId)),
  });

  if (loading) return <Loading />;
  if (error || !data) return <Error />;

  return (
    <TaskSettingSidebar
      list={data.list}
      availableLists={data.lists}
      task={data.task}
      updateTask={updateTask}
      updateRepeat={updateRepeat}
      setNote={setNote}
      updateTaskList={updateTaskListWithRedirect}
      deleteTask={deleteTask}
    />
  );
};

interface Props {
  list: Omit<List, "tasks">;
  availableLists: Pick<List, "id" | "title">[];
  task: TaskType;
  updateTask: (uti: UpdateTaskInput) => void;
  updateRepeat: (taskId: string, r: UpsertRepeatInput | null) => void;
  setNote: (taskId: string, n: UpsertNoteInput | null) => void;
  updateTaskList: (id: string, newListId: string) => void;
  deleteTask: (taskId: string) => void;
}

/**
 * Displays settings for a Task
 */
export const TaskSettingSidebar = (props: Props) => {
  const {
    list,
    availableLists,
    task,
    updateTask,
    updateRepeat,
    setNote,
    updateTaskList,
    deleteTask,
  } = props;

  const { includeTime, color, repeat } = task;
  const start = parseDate(task.start);
  const end = parseDate(task.end);

  const { updateDates, setIncludeTime, updateColor } = useMemo(
    () => demuxUpdateTask(task, updateTask),
    [task, updateTask]
  );

  return (
    <div>
      <Spacer spacing="60" />
      <Task
        listId={list.id}
        listColor={list.color as EventColor | null}
        updateTask={updateTask}
        {...task}
      />
      <Spacer spacing="48" />

      <Section>
        <IconContainer>
          <BookOutlined />
        </IconContainer>
        <ListSelect
          currentList={list}
          lists={availableLists}
          updateList={(listId) => updateTaskList(task.id, listId)}
        />
      </Section>

      <Spacer spacing="24" />

      <Section>
        <IconContainer>
          <ClockCircleOutlined />
        </IconContainer>
        <IncludeTimeRow>
          <Text.Main>Include Time</Text.Main>
          <Switch
            size="small"
            checked={includeTime}
            onChange={(checked) => setIncludeTime(checked)}
          />
        </IncludeTimeRow>
      </Section>

      <Spacer spacing="24" />

      <Section>
        <IconContainer>
          <CalendarOutlined />
        </IconContainer>
        <DateTimeRangePicker
          value={[start, end]}
          onChange={([newStart, newEnd]) => updateDates([newStart, newEnd])}
          includeTime={includeTime}
        />
      </Section>

      {start && (
        <>
          <Spacer spacing="24" />
          <Section>
            <IconContainer>
              <RetweetOutlined />
            </IconContainer>
            <RepeatSelect
              start={new Date(start)}
              repeat={repeat}
              updateRepeat={(uri) => updateRepeat(task.id, uri)}
            />
          </Section>
        </>
      )}

      <Spacer spacing="24" />

      <Section>
        <IconContainer>
          <HighlightOutlined />
        </IconContainer>
        <ColorSelect
          activeColor={color as EventColor | null}
          updateColor={updateColor}
        />
      </Section>

      <Spacer spacing="24" />

      <Editor
        initialContent={task.note?.body}
        onUpdate={(body) => {
          setNote(task.id, { body });
        }}
      />

      <Spacer spacing="24" />

      <Divider />

      <Section>
        <IconContainer>
          <DeleteOutlined />
        </IconContainer>
        <div>
          <Popconfirm
            title="Are you sure?"
            cancelText="no"
            okText="yes"
            onConfirm={() => deleteTask(task.id)}
            placement="right"
          >
            <Button danger>delete</Button>
          </Popconfirm>
        </div>
      </Section>
    </div>
  );
};

const Section = styled.div`
  display: grid;
  grid-template-columns: 24px auto;
  grid-column-gap: 12px;
`;

const IconContainer = styled.div`
  font-size: 24px;
`;

const IncludeTimeRow = styled.div`
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
