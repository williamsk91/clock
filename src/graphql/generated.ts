import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: string;
};

export type CreateListInput = {
  title: Scalars['String'];
  color: Maybe<Scalars['String']>;
};

export type CreateTaskInput = {
  title: Scalars['String'];
  done: Maybe<Scalars['DateTime']>;
  start: Maybe<Scalars['DateTime']>;
  end: Maybe<Scalars['DateTime']>;
  includeTime: Scalars['Boolean'];
  color: Maybe<Scalars['String']>;
  repeat: Maybe<UpsertRepeatInput>;
};


export type List = {
  __typename?: 'List';
  id: Scalars['ID'];
  title: Scalars['String'];
  color: Maybe<Scalars['String']>;
  order: Scalars['Float'];
  deleted: Maybe<Scalars['DateTime']>;
  tasks: Array<Task>;
};

export type Mutation = {
  __typename?: 'Mutation';
  signOut: Scalars['Boolean'];
  /** Danger! Deletes a user account. */
  deleteUser: Scalars['Boolean'];
  setRepeat: Repeat;
  createTask: Task;
  updateTaskList: Task;
  updateTask: Task;
  taskReorder: Array<TaskReorder>;
  deleteTask: Task;
  createList: List;
  updateList: List;
  deleteList: List;
};


export type MutationSetRepeatArgs = {
  repeat: Maybe<UpsertRepeatInput>;
  taskId: Scalars['ID'];
};


export type MutationCreateTaskArgs = {
  task: CreateTaskInput;
  listId: Scalars['ID'];
};


export type MutationUpdateTaskListArgs = {
  newListId: Scalars['ID'];
  id: Scalars['ID'];
};


export type MutationUpdateTaskArgs = {
  task: UpdateTaskInput;
};


export type MutationTaskReorderArgs = {
  tasks: Array<TaskReorderInput>;
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID'];
};


export type MutationCreateListArgs = {
  list: CreateListInput;
};


export type MutationUpdateListArgs = {
  list: UpdateListInput;
};


export type MutationDeleteListArgs = {
  listId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  me: User;
  task: Task;
  tasks: Array<Task>;
  completedTasks: Array<Task>;
  list: List;
  lists: Array<List>;
};


export type QueryTaskArgs = {
  id: Scalars['ID'];
};


export type QueryTasksArgs = {
  listId: Scalars['ID'];
};


export type QueryCompletedTasksArgs = {
  listId: Scalars['ID'];
};


export type QueryListArgs = {
  id: Scalars['ID'];
};

export type Repeat = {
  __typename?: 'Repeat';
  id: Scalars['ID'];
  freq: RepeatFrequency;
  start: Scalars['DateTime'];
  end: Maybe<Scalars['DateTime']>;
  byweekday: Maybe<Array<Scalars['String']>>;
  exclude: Maybe<Array<Scalars['String']>>;
};

export enum RepeatFrequency {
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
  Yearly = 'Yearly'
}

export type Task = {
  __typename?: 'Task';
  id: Scalars['ID'];
  title: Scalars['String'];
  done: Maybe<Scalars['DateTime']>;
  start: Maybe<Scalars['DateTime']>;
  end: Maybe<Scalars['DateTime']>;
  includeTime: Scalars['Boolean'];
  color: Maybe<Scalars['String']>;
  order: Scalars['Float'];
  deleted: Maybe<Scalars['DateTime']>;
  repeat: Maybe<Repeat>;
};

export type TaskReorder = {
  __typename?: 'TaskReorder';
  id: Scalars['ID'];
  order: Scalars['Float'];
};

export type TaskReorderInput = {
  id: Scalars['ID'];
  order: Scalars['Float'];
};

/** New list data */
export type UpdateListInput = {
  id: Scalars['ID'];
  title: Scalars['String'];
  color: Maybe<Scalars['String']>;
  order: Scalars['Float'];
};

/** New task data */
export type UpdateTaskInput = {
  id: Scalars['ID'];
  title: Scalars['String'];
  done: Maybe<Scalars['DateTime']>;
  start: Maybe<Scalars['DateTime']>;
  end: Maybe<Scalars['DateTime']>;
  includeTime: Scalars['Boolean'];
  color: Maybe<Scalars['String']>;
  order: Scalars['Float'];
};

export type UpsertRepeatInput = {
  freq: RepeatFrequency;
  start: Scalars['DateTime'];
  end: Maybe<Scalars['DateTime']>;
  byweekday: Maybe<Array<Scalars['String']>>;
  exclude: Maybe<Array<Scalars['String']>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
};

export type CalendarListsQueryVariables = Exact<{ [key: string]: never; }>;


export type CalendarListsQuery = (
  { __typename?: 'Query' }
  & { lists: Array<(
    { __typename?: 'List' }
    & { tasks: Array<(
      { __typename?: 'Task' }
      & TaskFragment
    )> }
    & ListFragment
  )> }
);

export type CreateListMutationVariables = Exact<{
  createListInput: CreateListInput;
}>;


export type CreateListMutation = (
  { __typename?: 'Mutation' }
  & { createList: (
    { __typename?: 'List' }
    & ListFragment
  ) }
);

export type CreateTaskMutationVariables = Exact<{
  listId: Scalars['ID'];
  createTaskInput: CreateTaskInput;
}>;


export type CreateTaskMutation = (
  { __typename?: 'Mutation' }
  & { createTask: (
    { __typename?: 'Task' }
    & TaskFragment
  ) }
);

export type DeleteListMutationVariables = Exact<{
  listId: Scalars['ID'];
}>;


export type DeleteListMutation = (
  { __typename?: 'Mutation' }
  & { deleteList: (
    { __typename?: 'List' }
    & ListFragment
  ) }
);

export type DeleteTaskMutationVariables = Exact<{
  taskId: Scalars['ID'];
}>;


export type DeleteTaskMutation = (
  { __typename?: 'Mutation' }
  & { deleteTask: (
    { __typename?: 'Task' }
    & TaskFragment
  ) }
);

export type ListFragment = (
  { __typename?: 'List' }
  & Pick<List, 'id' | 'title' | 'color' | 'order' | 'deleted'>
);

export type ListQueryVariables = Exact<{
  listId: Scalars['ID'];
}>;


export type ListQuery = (
  { __typename?: 'Query' }
  & { list: (
    { __typename?: 'List' }
    & { tasks: Array<(
      { __typename?: 'Task' }
      & TaskFragment
    )> }
    & ListFragment
  ) }
);

export type ListsQueryVariables = Exact<{
  withTasks: Scalars['Boolean'];
}>;


export type ListsQuery = (
  { __typename?: 'Query' }
  & { lists: Array<(
    { __typename?: 'List' }
    & { tasks: Array<(
      { __typename?: 'Task' }
      & TaskFragment
    )> }
    & ListFragment
  )> }
);

export type SetRepeatMutationVariables = Exact<{
  taskId: Scalars['ID'];
  repeat: Maybe<UpsertRepeatInput>;
}>;


export type SetRepeatMutation = (
  { __typename?: 'Mutation' }
  & { setRepeat: (
    { __typename?: 'Repeat' }
    & Pick<Repeat, 'id' | 'freq' | 'start' | 'end' | 'byweekday' | 'exclude'>
  ) }
);

export type TaskFragment = (
  { __typename?: 'Task' }
  & Pick<Task, 'id' | 'title' | 'done' | 'start' | 'end' | 'includeTime' | 'color' | 'order' | 'deleted'>
  & { repeat: Maybe<(
    { __typename?: 'Repeat' }
    & Pick<Repeat, 'id' | 'freq' | 'start' | 'end' | 'byweekday' | 'exclude'>
  )> }
);

export type TaskReorderMutationVariables = Exact<{
  tasks: Array<TaskReorderInput> | TaskReorderInput;
}>;


export type TaskReorderMutation = (
  { __typename?: 'Mutation' }
  & { taskReorder: Array<(
    { __typename?: 'TaskReorder' }
    & Pick<TaskReorder, 'id' | 'order'>
  )> }
);

export type TaskQueryVariables = Exact<{
  listId: Scalars['ID'];
  taskId: Scalars['ID'];
}>;


export type TaskQuery = (
  { __typename?: 'Query' }
  & { lists: Array<(
    { __typename?: 'List' }
    & Pick<List, 'id' | 'title'>
  )>, list: (
    { __typename?: 'List' }
    & ListFragment
  ), task: (
    { __typename?: 'Task' }
    & TaskFragment
  ) }
);

export type UpdateListMutationVariables = Exact<{
  list: UpdateListInput;
}>;


export type UpdateListMutation = (
  { __typename?: 'Mutation' }
  & { updateList: (
    { __typename?: 'List' }
    & ListFragment
  ) }
);

export type UpdateTaskListMutationVariables = Exact<{
  id: Scalars['ID'];
  newListId: Scalars['ID'];
}>;


export type UpdateTaskListMutation = (
  { __typename?: 'Mutation' }
  & { updateTaskList: (
    { __typename?: 'Task' }
    & TaskFragment
  ) }
);

export type UpdateTaskMutationVariables = Exact<{
  task: UpdateTaskInput;
}>;


export type UpdateTaskMutation = (
  { __typename?: 'Mutation' }
  & { updateTask: (
    { __typename?: 'Task' }
    & TaskFragment
  ) }
);

export type DeleteUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUser'>
);

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signOut'>
);

export const ListFragmentDoc = gql`
    fragment List on List {
  id
  title
  color
  order
  deleted
}
    `;
export const TaskFragmentDoc = gql`
    fragment Task on Task {
  id
  title
  done
  start
  end
  includeTime
  color
  order
  repeat {
    id
    freq
    start
    end
    byweekday
    exclude
  }
  deleted
}
    `;
export const CalendarListsDocument = gql`
    query CalendarLists {
  lists {
    tasks {
      ...Task
    }
    ...List
  }
}
    ${TaskFragmentDoc}
${ListFragmentDoc}`;

/**
 * __useCalendarListsQuery__
 *
 * To run a query within a React component, call `useCalendarListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCalendarListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCalendarListsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCalendarListsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CalendarListsQuery, CalendarListsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<CalendarListsQuery, CalendarListsQueryVariables>(CalendarListsDocument, options);
      }
export function useCalendarListsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CalendarListsQuery, CalendarListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<CalendarListsQuery, CalendarListsQueryVariables>(CalendarListsDocument, options);
        }
export type CalendarListsQueryHookResult = ReturnType<typeof useCalendarListsQuery>;
export type CalendarListsLazyQueryHookResult = ReturnType<typeof useCalendarListsLazyQuery>;
export type CalendarListsQueryResult = ApolloReactCommon.QueryResult<CalendarListsQuery, CalendarListsQueryVariables>;
export const CreateListDocument = gql`
    mutation CreateList($createListInput: CreateListInput!) {
  createList(list: $createListInput) {
    ...List
  }
}
    ${ListFragmentDoc}`;
export type CreateListMutationFn = ApolloReactCommon.MutationFunction<CreateListMutation, CreateListMutationVariables>;

/**
 * __useCreateListMutation__
 *
 * To run a mutation, you first call `useCreateListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createListMutation, { data, loading, error }] = useCreateListMutation({
 *   variables: {
 *      createListInput: // value for 'createListInput'
 *   },
 * });
 */
export function useCreateListMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateListMutation, CreateListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateListMutation, CreateListMutationVariables>(CreateListDocument, options);
      }
export type CreateListMutationHookResult = ReturnType<typeof useCreateListMutation>;
export type CreateListMutationResult = ApolloReactCommon.MutationResult<CreateListMutation>;
export type CreateListMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateListMutation, CreateListMutationVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($listId: ID!, $createTaskInput: CreateTaskInput!) {
  createTask(listId: $listId, task: $createTaskInput) {
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
 *      listId: // value for 'listId'
 *      createTaskInput: // value for 'createTaskInput'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = ApolloReactCommon.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const DeleteListDocument = gql`
    mutation DeleteList($listId: ID!) {
  deleteList(listId: $listId) {
    ...List
  }
}
    ${ListFragmentDoc}`;
export type DeleteListMutationFn = ApolloReactCommon.MutationFunction<DeleteListMutation, DeleteListMutationVariables>;

/**
 * __useDeleteListMutation__
 *
 * To run a mutation, you first call `useDeleteListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteListMutation, { data, loading, error }] = useDeleteListMutation({
 *   variables: {
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useDeleteListMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteListMutation, DeleteListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteListMutation, DeleteListMutationVariables>(DeleteListDocument, options);
      }
export type DeleteListMutationHookResult = ReturnType<typeof useDeleteListMutation>;
export type DeleteListMutationResult = ApolloReactCommon.MutationResult<DeleteListMutation>;
export type DeleteListMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteListMutation, DeleteListMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($taskId: ID!) {
  deleteTask(id: $taskId) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;
export type DeleteTaskMutationFn = ApolloReactCommon.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = ApolloReactCommon.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const ListDocument = gql`
    query List($listId: ID!) {
  list(id: $listId) {
    tasks {
      ...Task
    }
    ...List
  }
}
    ${TaskFragmentDoc}
${ListFragmentDoc}`;

/**
 * __useListQuery__
 *
 * To run a query within a React component, call `useListQuery` and pass it any options that fit your needs.
 * When your component renders, `useListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListQuery({
 *   variables: {
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useListQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ListQuery, ListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ListQuery, ListQueryVariables>(ListDocument, options);
      }
export function useListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListQuery, ListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ListQuery, ListQueryVariables>(ListDocument, options);
        }
export type ListQueryHookResult = ReturnType<typeof useListQuery>;
export type ListLazyQueryHookResult = ReturnType<typeof useListLazyQuery>;
export type ListQueryResult = ApolloReactCommon.QueryResult<ListQuery, ListQueryVariables>;
export const ListsDocument = gql`
    query Lists($withTasks: Boolean!) {
  lists {
    ...List
    tasks {
      ...Task
    }
  }
}
    ${ListFragmentDoc}
${TaskFragmentDoc}`;

/**
 * __useListsQuery__
 *
 * To run a query within a React component, call `useListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListsQuery({
 *   variables: {
 *      withTasks: // value for 'withTasks'
 *   },
 * });
 */
export function useListsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ListsQuery, ListsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ListsQuery, ListsQueryVariables>(ListsDocument, options);
      }
export function useListsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListsQuery, ListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ListsQuery, ListsQueryVariables>(ListsDocument, options);
        }
export type ListsQueryHookResult = ReturnType<typeof useListsQuery>;
export type ListsLazyQueryHookResult = ReturnType<typeof useListsLazyQuery>;
export type ListsQueryResult = ApolloReactCommon.QueryResult<ListsQuery, ListsQueryVariables>;
export const SetRepeatDocument = gql`
    mutation SetRepeat($taskId: ID!, $repeat: UpsertRepeatInput) {
  setRepeat(taskId: $taskId, repeat: $repeat) {
    id
    freq
    start
    end
    byweekday
    exclude
  }
}
    `;
export type SetRepeatMutationFn = ApolloReactCommon.MutationFunction<SetRepeatMutation, SetRepeatMutationVariables>;

/**
 * __useSetRepeatMutation__
 *
 * To run a mutation, you first call `useSetRepeatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetRepeatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setRepeatMutation, { data, loading, error }] = useSetRepeatMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      repeat: // value for 'repeat'
 *   },
 * });
 */
export function useSetRepeatMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetRepeatMutation, SetRepeatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetRepeatMutation, SetRepeatMutationVariables>(SetRepeatDocument, options);
      }
export type SetRepeatMutationHookResult = ReturnType<typeof useSetRepeatMutation>;
export type SetRepeatMutationResult = ApolloReactCommon.MutationResult<SetRepeatMutation>;
export type SetRepeatMutationOptions = ApolloReactCommon.BaseMutationOptions<SetRepeatMutation, SetRepeatMutationVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<TaskReorderMutation, TaskReorderMutationVariables>(TaskReorderDocument, options);
      }
export type TaskReorderMutationHookResult = ReturnType<typeof useTaskReorderMutation>;
export type TaskReorderMutationResult = ApolloReactCommon.MutationResult<TaskReorderMutation>;
export type TaskReorderMutationOptions = ApolloReactCommon.BaseMutationOptions<TaskReorderMutation, TaskReorderMutationVariables>;
export const TaskDocument = gql`
    query Task($listId: ID!, $taskId: ID!) {
  lists {
    id
    title
  }
  list(id: $listId) {
    ...List
  }
  task(id: $taskId) {
    ...Task
  }
}
    ${ListFragmentDoc}
${TaskFragmentDoc}`;

/**
 * __useTaskQuery__
 *
 * To run a query within a React component, call `useTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskQuery({
 *   variables: {
 *      listId: // value for 'listId'
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useTaskQuery(baseOptions: ApolloReactHooks.QueryHookOptions<TaskQuery, TaskQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<TaskQuery, TaskQueryVariables>(TaskDocument, options);
      }
export function useTaskLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TaskQuery, TaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<TaskQuery, TaskQueryVariables>(TaskDocument, options);
        }
export type TaskQueryHookResult = ReturnType<typeof useTaskQuery>;
export type TaskLazyQueryHookResult = ReturnType<typeof useTaskLazyQuery>;
export type TaskQueryResult = ApolloReactCommon.QueryResult<TaskQuery, TaskQueryVariables>;
export const UpdateListDocument = gql`
    mutation UpdateList($list: UpdateListInput!) {
  updateList(list: $list) {
    ...List
  }
}
    ${ListFragmentDoc}`;
export type UpdateListMutationFn = ApolloReactCommon.MutationFunction<UpdateListMutation, UpdateListMutationVariables>;

/**
 * __useUpdateListMutation__
 *
 * To run a mutation, you first call `useUpdateListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateListMutation, { data, loading, error }] = useUpdateListMutation({
 *   variables: {
 *      list: // value for 'list'
 *   },
 * });
 */
export function useUpdateListMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateListMutation, UpdateListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateListMutation, UpdateListMutationVariables>(UpdateListDocument, options);
      }
export type UpdateListMutationHookResult = ReturnType<typeof useUpdateListMutation>;
export type UpdateListMutationResult = ApolloReactCommon.MutationResult<UpdateListMutation>;
export type UpdateListMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateListMutation, UpdateListMutationVariables>;
export const UpdateTaskListDocument = gql`
    mutation UpdateTaskList($id: ID!, $newListId: ID!) {
  updateTaskList(id: $id, newListId: $newListId) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;
export type UpdateTaskListMutationFn = ApolloReactCommon.MutationFunction<UpdateTaskListMutation, UpdateTaskListMutationVariables>;

/**
 * __useUpdateTaskListMutation__
 *
 * To run a mutation, you first call `useUpdateTaskListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskListMutation, { data, loading, error }] = useUpdateTaskListMutation({
 *   variables: {
 *      id: // value for 'id'
 *      newListId: // value for 'newListId'
 *   },
 * });
 */
export function useUpdateTaskListMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTaskListMutation, UpdateTaskListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateTaskListMutation, UpdateTaskListMutationVariables>(UpdateTaskListDocument, options);
      }
export type UpdateTaskListMutationHookResult = ReturnType<typeof useUpdateTaskListMutation>;
export type UpdateTaskListMutationResult = ApolloReactCommon.MutationResult<UpdateTaskListMutation>;
export type UpdateTaskListMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTaskListMutation, UpdateTaskListMutationVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = ApolloReactCommon.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser {
  deleteUser
}
    `;
export type DeleteUserMutationFn = ApolloReactCommon.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, options);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = ApolloReactCommon.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = ApolloReactCommon.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;