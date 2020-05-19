import { Error } from "../components/flow/Error";
import { HomePage } from "./HomePage";
import { Loading } from "../components/flow/Loading";
import React from "react";
import { useTasksQuery } from "../graphql/generated";

/**
 * Home route is where most of the application's
 *  functionalities will be available.
 */
export const HomeRoute = () => {
  const { data, loading, error } = useTasksQuery();

  if (loading) return <Loading />;
  if (error || !data) return <Error />;

  const orderedTasks = data.tasks.sort((a, b) => a.order - b.order);

  return <HomePage tasks={orderedTasks} />;
};
