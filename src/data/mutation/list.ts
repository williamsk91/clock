import { useCallback } from "react";

import { MutationHookOptions } from "@apollo/client";

import { defaultEventColor } from "../../components/Calendar/styles";
import {
  DeleteListMutation,
  DeleteListMutationVariables,
  ListsDocument,
  ListsQuery,
  UpdateListInput,
  useCreateListMutation,
  useDeleteListMutation,
  useUpdateListMutation,
} from "../../graphql/generated";

/**
 * Create list mutation with cache update
 */
export const useCreateList = () => {
  const [createListMutation] = useCreateListMutation();
  const createList = useCallback(
    (t: string) => {
      createListMutation({
        variables: { createListInput: { title: t, color: defaultEventColor } },
        update: (cache, { data }) => {
          const cachedData = cache.readQuery<ListsQuery>({
            query: ListsDocument,
          });
          const newListData = data?.createList;
          if (!cachedData || !newListData) return;
          const newLists = [...cachedData.lists, newListData];
          cache.writeQuery<ListsQuery>({
            query: ListsDocument,
            data: {
              lists: newLists,
            },
          });
        },
      });
    },
    [createListMutation]
  );

  return createList;
};

/**
 * Update list with optimistic update
 */
export const useUpdateList = () => {
  const [updateListMutation] = useUpdateListMutation();
  const updateList = useCallback(
    (updateListInput: UpdateListInput) => {
      updateListMutation({
        variables: {
          list: updateListInput,
        },
        optimisticResponse: {
          updateList: {
            __typename: "List",
            deleted: null,
            ...updateListInput,
          },
        },
      });
    },
    [updateListMutation]
  );

  return updateList;
};

/**
 * Delete list
 */
export const useDeleteList = (
  options?: MutationHookOptions<DeleteListMutation, DeleteListMutationVariables>
) => {
  const [deleteListMutation] = useDeleteListMutation(options);
  const deleteList = useCallback(
    (listId: string) => {
      deleteListMutation({
        variables: {
          listId,
        },
      });
    },
    [deleteListMutation]
  );

  return deleteList;
};
