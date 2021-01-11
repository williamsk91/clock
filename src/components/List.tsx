import React from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styled from "styled-components";

import { List as ListProps } from "../graphql/generated";
import { EventColor, defaultEventColor, eventColors } from "./Calendar/styles";

interface IProp extends Omit<ListProps, "tasks"> {
  /**
   * Pass `onTitleEdit` prop to make the title of the list editable
   */
  onTitleEdit?: (t: string) => void;
  onClick?: () => void;
  onClickSetting?: (id: string) => void;
  settingIcon?: JSX.Element;
}

/**
 * List displays a list name, it's color as banner, and
 *  number of uncompleted tasks remaining.
 */
export const List = (props: IProp) => {
  const {
    id,
    title,
    color,
    onClick,
    onTitleEdit,
    onClickSetting,
    settingIcon,
  } = props;

  const isEditable = !!onTitleEdit;
  const isClickable = !!onClick;

  /** How many action buttons are there */
  const actionCount = onClickSetting ? 1 : 0;

  return (
    <Container isClickable={isClickable}>
      <Banner color={(color as EventColor | null) ?? defaultEventColor} />
      <ListContainer actionCount={actionCount}>
        <TitleInput
          placeholder="Title"
          value={title}
          readOnly={!isEditable}
          onChange={(e) => isEditable && onTitleEdit?.(e.currentTarget.value)}
          onClick={() => isClickable && onClick?.()}
        />
        {onClickSetting && (
          <ActionButton
            icon={settingIcon ?? <SettingOutlined />}
            type="text"
            onClick={() => onClickSetting(id)}
          />
        )}
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

const Banner = styled.div<{ color: EventColor }>`
  width: 12px;
  height: 48px;

  background: ${(p) => eventColors[p.color]};
`;

const ListContainer = styled.div<{ actionCount: number }>`
  height: 48px;

  /* 1px larger than calendar's events because this is including border */
  padding: 4px 0 4px 9px;

  display: grid;
  grid-template-columns: auto ${(p) => `repeat(${p.actionCount}, 33px)`};
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

const ActionButton = styled(Button)`
  width: 24px;
  height: 24px;

  margin-top: 3px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #828282;
  :hover {
    color: #828282;
  }

  transition: opacity 0.1s ease-in;
  ${Container}:hover & {
    opacity: 100;
  }

  /* icon */
  span {
    font-size: 24px;
  }
`;
