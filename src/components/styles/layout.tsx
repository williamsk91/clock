import styled from "styled-components";

/**
 * Page level layout
 */
export const Layout = styled.div`
  min-width: 600px;
  max-width: 840px;
  margin: 0 auto;
  padding: 48px;
`;

/**
 * Small width layout
 */
export const MiniLayout = styled.div`
  min-width: 240px;
  max-width: 480px;
  margin: 0 auto;
  padding: 120px 48px;
`;

// ------------------------- Sidebar Layout -------------------------
const SidebarContainer = styled.div`
  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template-columns: 365px 1fr;
`;

const SideBar = styled.div`
  height: 100vh;
  padding: 0 24px;
  box-sizing: border-box;

  background: #f7f8f7;
`;

const SidebarContent = styled.div`
  margin-left: 12px;
  overflow: hidden;

  background: white;
`;
export const Sidebar = {
  Container: SidebarContainer,
  SideBar,
  Content: SidebarContent
};
