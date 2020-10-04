import React from "react";

import styled from "styled-components";

import { List as ListProps } from "../graphql/generated";
import { defaultEventColor } from "./Calendar/styles";

interface IProp extends ListProps {
  /**
   * Pass `onTitleEdit` prop to make the title of the list editable
   */
  onTitleEdit?: (t: string) => void;
  onClick?: () => void;
}

/**
 * List displays a list name, it's color as banner, and
 *  number of uncompleted tasks remaining.
 */
export const List = (props: IProp) => {
  const { title, color, onClick, onTitleEdit } = props;

  const isEditable = !!onTitleEdit;
  const isClickable = !!onClick;

  return (
    <Container isClickable={isClickable}>
      <Banner color={color ?? defaultEventColor} />
      <ListContainer>
        <TitleInput
          placeholder="Title"
          value={title}
          readOnly={!isEditable}
          onChange={(e) => isEditable && onTitleEdit?.(e.currentTarget.value)}
          onClick={() => isClickable && onClick?.()}
        />
      </ListContainer>
    </Container>
  );
};

const Container = styled.div<{ isClickable: boolean }>`
  display: grid;
  grid-template-columns: 12px auto;
  grid-gap: 3px;

  :hover {
    cursor: ${(p) => (p.isClickable ? "pointer" : "cursor")};
  }
`;

const Banner = styled.div<{ color: string }>`
  width: 12px;
  height: 48px;

  background: ${(p) => p.color};
`;

const ListContainer = styled.div`
  height: 48px;

  /* 1px larger than calendar's events because this is including border */
  padding: 4px 0 4px 9px;

  display: grid;
  grid-template-columns: auto 33px;
  grid-gap: 12px;
  align-items: center;

  background: ${(p) => p.color};
`;

const TitleInput = styled.input`
  width: 100%;
  border: 0;

  padding: 0;
  margin-bottom: 1px;

  font-size: 18px;

  background: transparent;

  ::placeholder {
    opacity: 0.7;
  }

  :focus {
    outline: none;
  }

  :hover {
    cursor: ${(p) => (p.readOnly ? "pointer" : "initial")};
  }
`;

// const Count = styled.div`
//   width: 24px;
//   height: 24px;

//   background: #c4c4c4;
//   color: white;

//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;
