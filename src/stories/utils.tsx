import React, { FC } from "react";

import styled from "styled-components";

import { Sidebar } from "../components/styles/layout";

export const FullPageLayout = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const SidebarOnlyLayout: FC = (props) => (
  <Sidebar.Container>
    <Sidebar.SideBar>{props.children}</Sidebar.SideBar>
    <Sidebar.Content />
  </Sidebar.Container>
);
