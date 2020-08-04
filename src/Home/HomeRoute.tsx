import React from "react";

import { Error } from "../components/flow/Error";
import { Loading } from "../components/flow/Loading";
import { useTasksQuery } from "../graphql/generated";
import { HomePage } from "./HomePage";

/**
 * Home route is where most of the application's
 *  functionalities will be available.
 */
export const HomeRoute = () => {
  const { data, loading, error } = useTasksQuery();

  if (loading) return <Loading />;
  if (error || !data) return <Error />;

  const orderedTasks = data.tasks.slice().sort((a, b) => a.order - b.order);

  return <HomePage tasks={orderedTasks} />;
};
