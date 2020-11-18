import React, { useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { DeleteOutlined, HighlightOutlined } from "@ant-design/icons";
import { Button, Divider, Popconfirm } from "antd";
import styled from "styled-components";

import { Error, Loading, routes } from "../../components";
import { EventColor } from "../../components/Calendar/styles";
import { List } from "../../components/List";
import { ColorSelect } from "../../components/Settings";
import { Spacer } from "../../components/Spacer";
import { demuxUpdateList } from "../../components/utils/list";
import { useDeleteList, useUpdateList } from "../../data/mutation/list";
import {
  List as ListType,
  UpdateListInput,
  useListQuery,
} from "../../graphql/generated";

/**
 * Query task data and pass to `ListSidebar`.
 */
export const ListSettingSidebarWithData = () => {
  const { listId } = useParams<{ listId: string }>();
  const history = useHistory();

  const { data, loading, error } = useListQuery({
    variables: { listId },
  });

  const updateList = useUpdateList();
  const deleteList = useDeleteList({
    onCompleted: () => history.push(routes.home.index),
  });

  if (loading) return <Loading />;
  if (error || !data) return <Error />;

  const { id, title, color, order, deleted } = data.list;
  const list = { id, title, color, order, deleted };

  return (
    <ListSettingSidebar
      list={list}
      updateList={updateList}
      deleteList={deleteList}
    />
  );
};

interface Props {
  list: Omit<ListType, "tasks">;

  updateList: (uli: UpdateListInput) => void;
  deleteList: (listId: string) => void;
}

/**
 * Displays settings for a List
 */
export const ListSettingSidebar = (props: Props) => {
  const { list, updateList, deleteList } = props;

  const { setTitle, updateColor } = useMemo(
    () => demuxUpdateList(list, updateList),
    [list, updateList]
  );

  return (
    <div>
      <Spacer spacing="60" />

      <List {...list} onTitleEdit={setTitle} />

      <Spacer spacing="48" />

      <Section>
        <IconContainer>
          <HighlightOutlined />
        </IconContainer>
        <ColorSelect
          activeColor={list.color as EventColor | null}
          updateColor={updateColor}
        />
      </Section>

      <Spacer spacing="24" />

      <Divider />

      <Section>
        <IconContainer>
          <DeleteOutlined />
        </IconContainer>
        <div>
          <Popconfirm
            title="Are you sure?"
            cancelText="no"
            okText="yes"
            onConfirm={() => deleteList(list.id)}
            placement="right"
          >
            <Button danger>delete</Button>
          </Popconfirm>
        </div>
      </Section>
    </div>
  );
};

const Section = styled.div`
  display: grid;
  grid-template-columns: 24px auto;
  grid-column-gap: 12px;
`;

const IconContainer = styled.div`
  font-size: 24px;
`;
