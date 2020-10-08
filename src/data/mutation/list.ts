import { useCallback } from "react";

import { defaultEventColor } from "../../components/Calendar/styles";
import {
  ListsDocument,
  ListsQuery,
  UpdateListInput,
  useCreateListMutation,
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
            ...updateListInput,
          },
        },
      });
    },
    [updateListMutation]
  );

  return updateList;
};
