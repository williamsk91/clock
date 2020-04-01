import React, { useContext } from "react";
import {
  useListQuery,
  useUpdateTaskMutation
} from "../graphql/generatedGraphql";

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
        userList={userList ?? []}
      />
    );
  }

  return <Error />;
};
