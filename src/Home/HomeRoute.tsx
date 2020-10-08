import React from "react";

import { Error, Loading } from "../components";
import { Task, useCalendarListsQuery } from "../graphql/generated";
import { HomePage } from "./HomePage";

/**
 * Home route is where most of the application's
 *  functionalities will be available.
 */
export const HomeRoute = () => {
  const { data, loading, error } = useCalendarListsQuery();

  if (loading) return <Loading />;
  if (error || !data) return <Error />;

  const tasks: Task[] = data.lists.flatMap((l) => l.tasks);
  const orderedTasks: Task[] = tasks.slice().sort((a, b) => a.order - b.order);

  return <HomePage tasks={orderedTasks} />;
};
