import React from "react";
import { storiesOf } from "@storybook/react";
import { Task } from "../components/Task";
import { Task as TaskProps } from "../graphql/generated";


const story = storiesOf("Components|Task", module);

story.add("base", () => <Task {...getTask()} updateTask={(t) => console.log('update task: ', t)} />)

story.add("checked", () => <Task {...getTask({ done: new Date().toISOString() })} updateTask={(t) => console.log('update task: ', t)} />)

const getTask = (overwrite?: Partial<TaskProps>) => (
    {
        id: "task1Id",
        title: "Go grocery shopping",
        done: null,
        start: new Date().toISOString(),
        end: null,
        includeTime: true,
        order: 1,
        ...overwrite
    }
)