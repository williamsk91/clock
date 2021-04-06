import React from "react";
import { useHistory } from "react-router-dom";
import { CaretRightOutlined } from "@ant-design/icons";

import {
  Error,
  List,
  Loading,
  NewItem,
  Spacer,
  Today,
  homeListRoute,
} from "../../components";
import { listIsNotDeleted } from "../../components/listFilter";
import { useCreateList, useUpdateList } from "../../data/mutation/list";
import {
  List as ListType,
  UpdateListInput,
  useListsQuery,
} from "../../graphql/generated";

/**
 * Query task data and pass to `ListsSidebar`
 */
export const ListsSidebarWithData = () => {
  const history = useHistory();

  const { data, loading, error } = useListsQuery({});

  const createList = useCreateList();
  const updateList = useUpdateList();

  if (loading) return <Loading />;
  if (error || !data) return <Error />;

  const onClickSetting = (id: string) => {
    history.push(homeListRoute(id));
  };

  return (
    <ListsSidebar
      lists={data.lists}
      createList={createList}
      onUpdateList={updateList}
      onClickSetting={onClickSetting}
    />
  );
};

interface Props {
  lists: Omit<ListType, "tasks">[];

  createList: (t: string) => void;
  onUpdateList: (uli: UpdateListInput) => void;

  onClickSetting: (id: string) => void;
}

/**
 * Displays:
 *  1. Current date
 *  2. New list input
 *  3. Available lists
 */
export const ListsSidebar = (props: Props) => {
  const { createList, onUpdateList, onClickSetting } = props;

  const lists = props.lists.filter(listIsNotDeleted);

  return (
    <div>
      <Spacer spacing="60" />
      <Today />
      <Spacer spacing="48" />
      <NewItem placeholder="Add a new list" createItem={createList} />
      <Spacer spacing="12" />

      {lists.map((l) => (
        <React.Fragment key={l.id}>
          <List
            {...l}
            onTitleEdit={(t: string) =>
              onUpdateList({
                id: l.id,
                title: t,
                color: l.color,
                order: l.order,
              })
            }
            onClickSetting={() => onClickSetting(l.id)}
            settingIcon={<CaretRightOutlined />}
          />
          <Spacer spacing="12" />
        </React.Fragment>
      ))}
    </div>
  );
};
