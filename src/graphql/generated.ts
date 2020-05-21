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
  DateTime: string,
};


export type Mutation = {
   __typename?: 'Mutation',
  signOut: Scalars['Boolean'],
  createTask: Task,
  updateTask: Task,
  taskReorder: Array<TaskReorder>,
};


export type MutationCreateTaskArgs = {
  title: Scalars['String']
};


export type MutationUpdateTaskArgs = {
  task: UpdateTaskInput
};


export type MutationTaskReorderArgs = {
  tasks: Array<TaskReorderInput>
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
  order: Scalars['Float'],
};

export type TaskReorder = {
   __typename?: 'TaskReorder',
  id: Scalars['ID'],
  order: Scalars['Float'],
};

export type TaskReorderInput = {
  id: Scalars['ID'],
  order: Scalars['Float'],
};

/** New task data */
export type UpdateTaskInput = {
  id: Scalars['ID'],
  title: Scalars['String'],
  done: Scalars['Boolean'],
  start: Maybe<Scalars['DateTime']>,
  end: Maybe<Scalars['DateTime']>,
  includeTime: Scalars['Boolean'],
  order: Scalars['Float'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
};

export type CreateTaskMutationVariables = {
  title: Scalars['String']
};


export type CreateTaskMutation = (
  { __typename?: 'Mutation' }
  & { createTask: (
    { __typename?: 'Task' }
    & TaskFragment
  ) }
);

export type TaskFragment = (
  { __typename?: 'Task' }
  & Pick<Task, 'id' | 'title' | 'done' | 'start' | 'end' | 'includeTime' | 'order'>
);

export type TaskReorderMutationVariables = {
  tasks: Array<TaskReorderInput>
};


export type TaskReorderMutation = (
  { __typename?: 'Mutation' }
  & { taskReorder: Array<(
    { __typename?: 'TaskReorder' }
    & Pick<TaskReorder, 'id' | 'order'>
  )> }
);

export type TasksQueryVariables = {};


export type TasksQuery = (
  { __typename?: 'Query' }
  & { tasks: Array<(
    { __typename?: 'Task' }
    & TaskFragment
  )> }
);

export type UpdateTaskMutationVariables = {
  task: UpdateTaskInput
};


export type UpdateTaskMutation = (
  { __typename?: 'Mutation' }
  & { updateTask: (
    { __typename?: 'Task' }
    & TaskFragment
  ) }
);

export type SignOutMutationVariables = {};


export type SignOutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signOut'>
);

export const TaskFragmentDoc = gql`
    fragment Task on Task {
  id
  title
  done
  start
  end
  includeTime
  order
}
    `;
export const CreateTaskDocument = gql`
    mutation CreateTask($title: String!) {
  createTask(title: $title) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;
export type CreateTaskMutationFn = ApolloReactCommon.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, baseOptions);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = ApolloReactCommon.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const TaskReorderDocument = gql`
    mutation TaskReorder($tasks: [TaskReorderInput!]!) {
  taskReorder(tasks: $tasks) {
    id
    order
  }
}
    `;
export type TaskReorderMutationFn = ApolloReactCommon.MutationFunction<TaskReorderMutation, TaskReorderMutationVariables>;

/**
 * __useTaskReorderMutation__
 *
 * To run a mutation, you first call `useTaskReorderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTaskReorderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [taskReorderMutation, { data, loading, error }] = useTaskReorderMutation({
 *   variables: {
 *      tasks: // value for 'tasks'
 *   },
 * });
 */
export function useTaskReorderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TaskReorderMutation, TaskReorderMutationVariables>) {
        return ApolloReactHooks.useMutation<TaskReorderMutation, TaskReorderMutationVariables>(TaskReorderDocument, baseOptions);
      }
export type TaskReorderMutationHookResult = ReturnType<typeof useTaskReorderMutation>;
export type TaskReorderMutationResult = ApolloReactCommon.MutationResult<TaskReorderMutation>;
export type TaskReorderMutationOptions = ApolloReactCommon.BaseMutationOptions<TaskReorderMutation, TaskReorderMutationVariables>;
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
export const UpdateTaskDocument = gql`
    mutation UpdateTask($task: UpdateTaskInput!) {
  updateTask(task: $task) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;
export type UpdateTaskMutationFn = ApolloReactCommon.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      task: // value for 'task'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, baseOptions);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = ApolloReactCommon.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const SignOutDocument = gql`
    mutation SignOut {
  signOut
}
    `;
export type SignOutMutationFn = ApolloReactCommon.MutationFunction<SignOutMutation, SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignOutMutation, SignOutMutationVariables>) {
        return ApolloReactHooks.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, baseOptions);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = ApolloReactCommon.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = ApolloReactCommon.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;