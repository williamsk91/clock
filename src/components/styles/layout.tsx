import styled from "styled-components";

// ------------------------- Full Page Layout -------------------------
const FullPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const FullPageContent = styled.div`
  min-width: 600px;
  width: 100%;

  padding: 48px;
  box-sizing: border-box;
  overflow-y: scroll;
`;

export const FullPage = {
  Container: FullPageContainer,
  Content: FullPageContent,
};

// ------------------------- Sidebar Layout -------------------------
const SidebarContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const SideBar = styled.div`
  width: 365px;
  height: 100vh;

  padding: 0 24px;
  box-sizing: border-box;

  background: #f7f8f7;
`;

const SidebarContent = styled.div`
  flex-grow: 1;
  margin-left: 12px;
  overflow: hidden;

  background: white;
`;

export const Sidebar = {
  Container: SidebarContainer,
  SideBar,
  Content: SidebarContent,
};

// ------------------------- Simple Center Column layout  -------------------------

/**
 * Small width layout
 */
const MiniLayout = styled.div`
  width: 100vw;
  height: 100vh;

  min-width: 240px;
  max-width: 480px;

  margin: 0 auto;
  padding: 120px 48px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MiniIllustration = styled.img`
  max-width: 300px;
`;

export const Mini = {
  Container: MiniLayout,
  Illustration: MiniIllustration,
};
