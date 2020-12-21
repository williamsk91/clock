import { Fragment } from "react";
import { format, isSameDay } from "date-fns/esm";

import { Error, Loading, Spacer, Task, Text } from "../../components";
import { EventColor } from "../../components/Calendar/styles";
import { applyFilterOnTask, taskIsDoneP } from "../../components/utils/filter";
import { useUpdateTask } from "../../data/mutation/task";
import { List, UpdateTaskInput, useListsQuery } from "../../graphql/generated";

export const CompletedTasksSidebarWithData = () => {
  const { data, loading, error } = useListsQuery({
    variables: { withTasks: true },
  });

  const updateTask = useUpdateTask();

  if (loading) return <Loading />;
  if (error || !data) return <Error />;

  return <CompletedTasksSidebar lists={data.lists} updateTask={updateTask} />;
};

interface Props {
  lists: List[];
  updateTask: (uti: UpdateTaskInput) => void;
}

export const CompletedTasksSidebar = (props: Props) => {
  const { lists, updateTask } = props;

  const completedLists = lists.map(applyFilterOnTask([taskIsDoneP]));
  const orderedTasks = orderListsTasksByCompletedDate(completedLists);

  return (
    <div>
      <Spacer spacing="60" />
      <Text.Title>Completed Tasks</Text.Title>
      <Spacer spacing="48" />
      {orderedTasks.map((ot) => (
        <Fragment key={+ot.date}>
          <Text.SubTitle>{format(ot.date, "d MMM yyyy")}</Text.SubTitle>
          <Spacer spacing="6" />
          {ot.lists.map((l) => (
            <Fragment key={l.tasks[0].id}>
              <Task
                listId={l.id}
                listColor={l.color as EventColor}
                updateTask={updateTask}
                {...l.tasks[0]}
              />
              <Spacer spacing="12" />
            </Fragment>
          ))}
          <Spacer spacing="48" />
        </Fragment>
      ))}
    </div>
  );
};

// ------------------------- Helper Functions -------------------------

interface CompletedTaskDate {
  date: Date;
  list: List;
}

interface CompletedTasksDate {
  date: Date;
  lists: List[];
}

/**
 * Order tasks by completion date
 */
const orderListsTasksByCompletedDate = (
  lists: List[]
): CompletedTasksDate[] => {
  const flatList: CompletedTaskDate[] = lists.flatMap((l) =>
    l.tasks.map((t) => ({
      date: new Date(t.done as string),
      list: { ...l, tasks: [t] },
    }))
  );
  const sortedList = flatList.sort((a, b) => +b.date - +a.date);

  if (sortedList.length === 0) return [];
  if (sortedList.length === 1)
    return [
      {
        date: sortedList[0].date,
        lists: [sortedList[0].list],
      },
    ];

  // n > 1
  const bins: [date: Date, start: number, end: number][] = [];
  let start = 0;
  let end = 1;
  let date = sortedList[0].date;
  sortedList.forEach((sl) => {
    if (isSameDay(date, sl.date)) {
      end++;
    } else {
      bins.push([date, start, end]);
      start = end;
      end++;
      date = sl.date;
    }
  });
  bins.push([date, start, end]);

  const ordered = bins.map(([date, start, end]) => ({
    date,
    lists: sortedList.slice(start, end).map((sl) => sl.list),
  }));

  return ordered;
};
