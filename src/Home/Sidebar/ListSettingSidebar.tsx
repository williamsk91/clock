import React from "react";

import { HighlightOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { List } from "../../components/List";
import { ColorSelect } from "../../components/Settings";
import { Spacer } from "../../components/Spacer";
import { List as ListType, UpdateListInput } from "../../graphql/generated";

interface Props {
  list: ListType;

  updateList: (uli: UpdateListInput) => void;
}

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
          activeColor={list.color}
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
