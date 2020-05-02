import { gql } from 'graphql.macro';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
};


export type Mutation = {
   __typename?: 'Mutation',
  createTask: Task,
  updateTask: Task,
};


export type MutationCreateTaskArgs = {
  title: Scalars['String']
};


export type MutationUpdateTaskArgs = {
  task: UpdateTaskInput
};

export type Query = {
   __typename?: 'Query',
  me: User,
  tasks: Array<Task>,
};

export type Task = {
   __typename?: 'Task',
  id: Scalars['ID'],
  title: Scalars['String'],
  done: Scalars['Boolean'],
  start: Maybe<Scalars['DateTime']>,
  end: Maybe<Scalars['DateTime']>,
  includeTime: Scalars['Boolean'],
};

/** New task data */
export type UpdateTaskInput = {
  id: Scalars['ID'],
  title: Scalars['String'],
  done: Scalars['Boolean'],
  start: Maybe<Scalars['DateTime']>,
  end: Maybe<Scalars['DateTime']>,
  includeTime: Scalars['Boolean'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
};

export type TaskFragment = (
  { __typename?: 'Task' }
  & Pick<Task, 'id' | 'title' | 'done' | 'start' | 'end' | 'includeTime'>
);

export type TasksQueryVariables = {};


export type TasksQuery = (
  { __typename?: 'Query' }
  & { tasks: Array<(
    { __typename?: 'Task' }
    & TaskFragment
  )> }
);

export const TaskFragmentDoc = gql`
    fragment Task on Task {
  id
  title
  done
  start
  end
  includeTime
}
    `;
export const TasksDocument = gql`
    query Tasks {
  tasks {
    ...Task
  }
}
    ${TaskFragmentDoc}`;

/**
 * __useTasksQuery__
 *
 * To run a query within a React component, call `useTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useTasksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TasksQuery, TasksQueryVariables>) {
        return ApolloReactHooks.useQuery<TasksQuery, TasksQueryVariables>(TasksDocument, baseOptions);
      }
export function useTasksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TasksQuery, TasksQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TasksQuery, TasksQueryVariables>(TasksDocument, baseOptions);
        }
export type TasksQueryHookResult = ReturnType<typeof useTasksQuery>;
export type TasksLazyQueryHookResult = ReturnType<typeof useTasksLazyQuery>;
export type TasksQueryResult = ApolloReactCommon.QueryResult<TasksQuery, TasksQueryVariables>;