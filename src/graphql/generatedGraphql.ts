import { gql } from 'graphql.macro';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateTaskInput = {
  done: Maybe<Scalars['String']>;
  title: Scalars['String'];
  start: Maybe<Scalars['String']>;
};

export type List = {
   __typename?: 'List';
  id: Scalars['ID'];
  title: Scalars['String'];
  tasks: Array<Task>;
};

export type Mutation = {
   __typename?: 'Mutation';
  createList: List;
  deleteList: Scalars['String'];
  createTask: Task;
  updateTask: Task;
  invalidateTokens: Scalars['Boolean'];
};


export type MutationCreateListArgs = {
  title: Scalars['String'];
};


export type MutationDeleteListArgs = {
  id: Scalars['ID'];
};


export type MutationCreateTaskArgs = {
  listId: Scalars['ID'];
  task: CreateTaskInput;
};


export type MutationUpdateTaskArgs = {
  task: UpdateTaskInput;
};

export type Query = {
   __typename?: 'Query';
  list: List;
  userList: Array<List>;
  me: Maybe<User>;
};


export type QueryListArgs = {
  id: Scalars['ID'];
};

export type Task = {
   __typename?: 'Task';
  id: Scalars['ID'];
  done: Maybe<Scalars['String']>;
  title: Scalars['String'];
  start: Maybe<Scalars['String']>;
  hasTime: Scalars['Boolean'];
};

export type UpdateTaskInput = {
  id: Scalars['ID'];
  done: Maybe<Scalars['String']>;
  title: Scalars['String'];
  start: Maybe<Scalars['String']>;
  hasTime: Scalars['Boolean'];
};

export type User = {
   __typename?: 'User';
  id: Scalars['String'];
  email: Scalars['String'];
  displayName: Maybe<Scalars['String']>;
};

export type ListQueryVariables = {
  id: Scalars['ID'];
};


export type ListQuery = (
  { __typename?: 'Query' }
  & { list: (
    { __typename?: 'List' }
    & Pick<List, 'id' | 'title'>
    & { tasks: Array<(
      { __typename?: 'Task' }
      & TaskFragment
    )> }
  ) }
);

export type TaskFragment = (
  { __typename?: 'Task' }
  & Pick<Task, 'id' | 'title' | 'done' | 'start' | 'hasTime'>
);

export type UpdateTaskMutationVariables = {
  task: UpdateTaskInput;
};


export type UpdateTaskMutation = (
  { __typename?: 'Mutation' }
  & { updateTask: (
    { __typename?: 'Task' }
    & TaskFragment
  ) }
);

export type UserListQueryVariables = {};


export type UserListQuery = (
  { __typename?: 'Query' }
  & { userList: Array<(
    { __typename?: 'List' }
    & Pick<List, 'id' | 'title'>
  )> }
);

export const TaskFragmentDoc = gql`
    fragment Task on Task {
  id
  title
  done
  start
  hasTime
}
    `;
export const ListDocument = gql`
    query List($id: ID!) {
  list(id: $id) {
    id
    title
    tasks {
      ...Task
    }
  }
}
    ${TaskFragmentDoc}`;

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
 *      id: // value for 'id'
 *   },
 * });
 */
export function useListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ListQuery, ListQueryVariables>) {
        return ApolloReactHooks.useQuery<ListQuery, ListQueryVariables>(ListDocument, baseOptions);
      }
export function useListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListQuery, ListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ListQuery, ListQueryVariables>(ListDocument, baseOptions);
        }
export type ListQueryHookResult = ReturnType<typeof useListQuery>;
export type ListLazyQueryHookResult = ReturnType<typeof useListLazyQuery>;
export type ListQueryResult = ApolloReactCommon.QueryResult<ListQuery, ListQueryVariables>;
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
export const UserListDocument = gql`
    query UserList {
  userList {
    id
    title
  }
}
    `;

/**
 * __useUserListQuery__
 *
 * To run a query within a React component, call `useUserListQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserListQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserListQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserListQuery, UserListQueryVariables>) {
        return ApolloReactHooks.useQuery<UserListQuery, UserListQueryVariables>(UserListDocument, baseOptions);
      }
export function useUserListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserListQuery, UserListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserListQuery, UserListQueryVariables>(UserListDocument, baseOptions);
        }
export type UserListQueryHookResult = ReturnType<typeof useUserListQuery>;
export type UserListLazyQueryHookResult = ReturnType<typeof useUserListLazyQuery>;
export type UserListQueryResult = ApolloReactCommon.QueryResult<UserListQuery, UserListQueryVariables>;