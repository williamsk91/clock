import * as Text from "./Text";

import React, { FC } from "react";

import { Menu } from "antd";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const { SubMenu } = Menu;

export enum TitleType {
  Home = "home",
  Lists = "lists"
}

export interface SubmenuProps {
  title: string;
  items: { title: string; onClick?: () => void }[];
}

interface IProp {
  type: TitleType;
  submenu?: SubmenuProps;
}

/**
 * Extensible Title of the current page. Can be on of the following.
 *
 *  1. Home - displays calendar and tasks from different lists
 *  2. List - displays a single list
 */
export const Title: FC<IProp> = props => {
  const { type, submenu } = props;
  const history = useHistory();

  const Submenu = submenu && (
    <SubMenu title={<MenuTitle>{submenu.title}</MenuTitle>}>
      {submenu.items.map(({ title }) => (
        <Menu.Item>
          <Item>{title}</Item>
        </Menu.Item>
      ))}
    </SubMenu>
  );

  return (
    <Container>
      <Menu mode="horizontal" selectable={false}>
        <SubMenu
          title={
            <MenuTitle>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </MenuTitle>
          }
        >
          <Menu.Item onClick={() => history.push("/")}>
            <Item>Home</Item>
          </Menu.Item>
          <Menu.Item onClick={() => history.push("/list")}>
            <Item>Lists</Item>
          </Menu.Item>
        </SubMenu>
        {Submenu}
      </Menu>
    </Container>
  );
};

const MenuTitle: FC = ({ children }) => (
  <TitleContainer>
    <Text.Title>{children}</Text.Title>
  </TitleContainer>
);

const Item: FC = ({ children }) => (
  <TitleOptionContainer>
    <Text.Title>{children}</Text.Title>
  </TitleOptionContainer>
);

const Container = styled.div`
  width: fit-content;
`;

const TitleContainer = styled.div`
  width: fit-content;

  display: flex;
  align-items: baseline;

  border-bottom: 2px solid ${p => p.theme.text.main};

  :hover {
    border-bottom: 2px solid ${p => p.theme.text.action};
    color: ${p => p.theme.text.action};
  }

  :hover ${Text.Title} {
    color: ${p => p.theme.text.action};
  }
`;

const TitleOptionContainer = styled(TitleContainer)`
  border-bottom: 1px solid ${p => p.theme.text.main};

  ${Text.Title} {
    font-weight: 200;
  }

  :hover {
    border-bottom: 2px solid ${p => p.theme.text.main};

    ${Text.Title} {
      font-weight: initial;
    }
  }
`;
