import {
  ListDocument,
  ListQuery,
  ListQueryVariables,
  useCreateTaskMutation,
  useListQuery,
  useUpdateTaskMutation
} from "../graphql/generatedGraphql";
import React, { useContext } from "react";

import { Error } from "../components/flow/Error";
import { ListPage } from "./ListPage";
import { Loading } from "../components/flow/Loading";
import { UserListContext } from "../components/TitleContext";
import { useParams } from "react-router-dom";

export const ListRoute = () => {
  const userList = useContext(UserListContext);
  const { id } = useParams<{ id: string }>();

  const { data, loading } = useListQuery({ variables: { id } });

  const [updateTask] = useUpdateTaskMutation();
  const [createTask] = useCreateTaskMutation();

  if (loading) return <Loading />;

  if (data) {
    return (
      <ListPage
        {...data.list}
        updateTask={task => {
          updateTask({
            variables: { task },
            optimisticResponse: {
              __typename: "Mutation",
              updateTask: {
                __typename: "Task",
                ...task
              }
            }
          });
        }}
        createTask={title => {
          createTask({
            variables: {
              listId: data.list.id,
              task: {
                title,
                done: null,
                start: null
              }
            },
            update: (cache, { data: createTaskData }) => {
              if (!createTaskData) return;

              const cachedList = cache.readQuery<ListQuery, ListQueryVariables>(
                {
                  query: ListDocument,
                  variables: { id: data.list.id }
                }
              );
              if (!cachedList) return;
              const { list } = cachedList;

              const newList = {
                ...list,
                tasks: [...list.tasks, createTaskData.createTask].map(t => ({
                  ...t,
                  __typename: "Task"
                }))
              };
              cache.writeQuery({
                query: ListDocument,
                variables: { id: data.list.id },
                data: { list: newList }
              });
            }
          });
        }}
        userList={userList ?? []}
      />
    );
  }

  return <Error />;
};
