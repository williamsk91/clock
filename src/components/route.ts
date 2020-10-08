export const homeListRoute = (listId: string) => `/cal/list/${listId}`;
export const homeListSettingRoute = (listId: string) =>
  `/cal/list/${listId}/setting`;
export const homeTaskSettingRoute = (listId: string, taskId: string) =>
  `/cal/list/${listId}/task/${taskId}/setting`;

export const routes = {
  login: "/login",
  setting: "/setting",
  home: {
    index: "/cal",
    list: homeListRoute(":listId"),
    listSetting: homeListSettingRoute(":listId"),
    taskSetting: homeTaskSettingRoute(":listId", ":taskId"),
    newTask: "/cal/newTask",
  },
  // used for rerouting some error pages
  error: "/404",
};
