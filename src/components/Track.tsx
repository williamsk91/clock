import React from "react";
import { matchPath, useHistory, useLocation } from "react-router-dom";
import {
  CaretLeftFilled,
  CheckSquareFilled,
  CloudFilled,
  HomeFilled,
  NotificationFilled,
  PieChartFilled,
  SettingFilled,
} from "@ant-design/icons";
import { Menu as AMenu } from "antd";
import styled from "styled-components";

import { eventColors } from "./Calendar/styles";
import { homeListRoute, routes } from "./route";

/**
 * `Track` component with routing setup
 */
export const TrackWithRoutes = () => {
  const history = useHistory();
  const location = useLocation();

  const goBackPath = getGoBackPath(location.pathname);

  return (
    <Track
      selectedItem={getSelectedItem(location.pathname)}
      goBack={goBackPath ? () => history.push(goBackPath) : undefined}
      goHome={() => history.push(routes.home.index)}
      goData={() => history.push(routes.data)}
      goCompletedTask={() => history.push(routes.home.completedTask)}
      goFeedback={() => history.push(routes.feedback)}
      goSetting={() => history.push(routes.setting)}
    />
  );
};

enum SelectableItems {
  Home,
  Data,
  CompletedTask,
  Feedback,
  Setting,
}

interface Props {
  selectedItem?: SelectableItems;
  goBack?: () => void;
  goHome: () => void;
  goData: () => void;
  goCompletedTask: () => void;
  goFeedback: () => void;
  goSetting: () => void;
}

/**
 * Side menu for app level navigations.
 *
 * Includes:
 *  1. Optional back button
 *  2. Home
 *  3. Completed
 *  4. Feeback
 *  5. Settings
 */
export const Track = (props: Props) => {
  const {
    selectedItem,
    goBack,
    goHome,
    goData,
    goCompletedTask,
    goFeedback,
    goSetting,
  } = props;

  return (
    <Container>
      <Menu selectable={false}>
        <MenuItem selected={false} icon={<CloudFilled />} />
        <MenuItem
          onClick={goBack}
          selected={false}
          icon={<CaretLeftFilled />}
          disabled={!goBack}
        />
        <Menu.Divider />
        <MenuItem
          selected={selectedItem === SelectableItems.Home}
          onClick={goHome}
          icon={<HomeFilled />}
        />
        <MenuItem
          selected={selectedItem === SelectableItems.Data}
          onClick={goData}
          icon={<PieChartFilled />}
        />
        <MenuItem
          selected={selectedItem === SelectableItems.CompletedTask}
          onClick={goCompletedTask}
          icon={<CheckSquareFilled />}
        />
        <Menu.Divider />
      </Menu>
      <Menu selectable={false}>
        <Menu.Divider />
        <MenuItem
          selected={selectedItem === SelectableItems.Feedback}
          onClick={goFeedback}
          icon={<NotificationFilled />}
        />
        <MenuItem
          selected={selectedItem === SelectableItems.Setting}
          onClick={goSetting}
          icon={<SettingFilled />}
        />
      </Menu>
    </Container>
  );
};

const Container = styled.div`
  width: 60px;
  height: 100vh;

  display: grid;
  grid-template-rows: 1fr min-content;
`;

const Menu = styled(AMenu)`
  width: 60px;
`;

const MenuItem = styled(Menu.Item).attrs({
  style: { padding: 0, margin: "12px 6px" },
})<{ selected: boolean }>`
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 24px;
    fill: ${(p) =>
      p.disabled ? "#f7f8f7" : p.selected ? eventColors.red : "#828282"};
  }

  background: ${(p) => (p.selected ? "#f7f8f7" : "initial")};
  :hover {
    background: #f7f8f7;
  }
`;

// ------------------------- Helper Functions -------------------------

/**
 * Given the current path, `path`, what is the path for the back button
 */
const getGoBackPath = (path: string): string | undefined => {
  if (matchPath(path, { path: routes.home.list, exact: true })) {
    return routes.home.index;
  }

  let match = matchPath<{ listId: string }>(path, {
    path: routes.home.listSetting,
    exact: true,
  });
  if (match) {
    return homeListRoute(match.params.listId);
  }

  match = matchPath<{ listId: string }>(path, {
    path: routes.home.taskSetting,
    exact: true,
  });
  if (match) {
    return homeListRoute(match.params.listId);
  }

  return undefined;
};

/**
 * Find the selected track item
 */
const getSelectedItem = (path: string): SelectableItems | undefined => {
  let match = matchPath(path, {
    path: routes.home.completedTask,
    exact: true,
  });
  if (match) return SelectableItems.CompletedTask;

  match = matchPath(path, {
    path: routes.home.index,
    exact: true,
  });
  if (match) return SelectableItems.Home;

  match = matchPath(path, {
    path: routes.data,
  });
  if (match) return SelectableItems.Data;

  match = matchPath(path, {
    path: routes.feedback,
  });
  if (match) return SelectableItems.Feedback;

  match = matchPath(path, {
    path: routes.setting,
  });
  if (match) return SelectableItems.Setting;

  return undefined;
};
