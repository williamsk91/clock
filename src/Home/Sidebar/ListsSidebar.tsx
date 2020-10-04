import React from "react";

import { Today } from "../../components/Date";
import { List } from "../../components/List";
import { NewItem } from "../../components/NewItem";
import { Spacer } from "../../components/Spacer";
import { List as ListType } from "../../graphql/generated";

interface DataProps {}

export const ListsSidebarWithData = (props: DataProps) => {
  return <div />;
};

interface Props {
  lists: ListType[];

  createList: (t: string) => void;
}

/**
 * Displays:
 *  1. Current date
 *  2. New list input
 *  3. Available lists
 */
export const ListsSidebar = (props: Props) => {
  const { lists, createList } = props;
  return (
    <div>
      <Spacer spacing="60" />
      <Today />
      <Spacer spacing="48" />
      <NewItem placeholder="Add a new list" createItem={createList} />
      <Spacer spacing="12" />

      {lists.map((l) => (
        <>
          <List {...l} />
          <Spacer spacing="12" />
        </>
      ))}
    </div>
  );
};
