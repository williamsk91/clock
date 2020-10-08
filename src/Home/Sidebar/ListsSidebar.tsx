import React from "react";
import { useHistory } from "react-router-dom";

import {
  Error,
  List,
  Loading,
  NewItem,
  Spacer,
  Today,
  homeListRoute,
} from "../../components";
import { useCreateList } from "../../data/mutation/list";
import { List as ListType, useListsQuery } from "../../graphql/generated";

/**
 * Query task data and pass to `ListsSidebar`
 */
export const ListsSidebarWithData = () => {
  const history = useHistory();

  const { data, loading, error } = useListsQuery();

  const createList = useCreateList();

  if (loading) return <Loading />;
  if (error || !data) return <Error />;

  const onClickList = (id: string) => {
    history.push(homeListRoute(id));
  };

  return (
    <ListsSidebar
      lists={data.lists}
      createList={createList}
      onClickList={onClickList}
    />
  );
};

interface Props {
  lists: Omit<ListType, "tasks">[];
  createList: (t: string) => void;
  onClickList: (id: string) => void;
}

/**
 * Displays:
 *  1. Current date
 *  2. New list input
 *  3. Available lists
 */
export const ListsSidebar = (props: Props) => {
  const { lists, createList, onClickList } = props;
  return (
    <div>
      <Spacer spacing="60" />
      <Today />
      <Spacer spacing="48" />
      <NewItem placeholder="Add a new list" createItem={createList} />
      <Spacer spacing="12" />

      {lists.map((l) => (
        <React.Fragment key={l.id}>
          <List {...l} onClick={() => onClickList(l.id)} />
          <Spacer spacing="12" />
        </React.Fragment>
      ))}
    </div>
  );
};
