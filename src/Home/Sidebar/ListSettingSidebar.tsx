import React from "react";
import { useParams } from "react-router-dom";

import { HighlightOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { Error, Loading } from "../../components";
import { EventColor } from "../../components/Calendar/styles";
import { List } from "../../components/List";
import { ColorSelect } from "../../components/Settings";
import { Spacer } from "../../components/Spacer";
import { useUpdateList } from "../../data/mutation/list";
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

  const { data, loading, error } = useListQuery({
    variables: { listId },
  });

  const updateList = useUpdateList();

  if (loading) return <Loading />;
  if (error || !data) return <Error />;

  const { id, title, color, order } = data.list;
  const list = { id, title, color, order };

  return <ListSettingSidebar list={list} updateList={updateList} />;
};

interface Props {
  list: Omit<ListType, "tasks">;

  updateList: (uli: UpdateListInput) => void;
}

/**
 * Displays settings for a List
 */
export const ListSettingSidebar = (props: Props) => {
  const { list, updateList } = props;

  return (
    <div>
      <Spacer spacing="60" />

      <List {...list} onTitleEdit={(title) => updateList({ ...list, title })} />

      <Spacer spacing="48" />

      <Section>
        <IconContainer>
          <HighlightOutlined />
        </IconContainer>
        <ColorSelect
          activeColor={list.color as EventColor | null}
          updateColor={(color) => updateList({ ...list, color })}
        />
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
