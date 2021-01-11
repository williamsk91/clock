export const homeListRoute = (listId: string) => `/cal/list/${listId}`;
export const homeListSettingRoute = (listId: string) =>
  `/cal/list/${listId}/setting`;
export const homeTaskSettingRoute = (listId: string, taskId: string) =>
  `/cal/list/${listId}/task/${taskId}/setting`;

export const routes = {
  login: "/login",
  home: {
    index: "/cal",
    list: homeListRoute(":listId"),
    listSetting: homeListSettingRoute(":listId"),
    taskSetting: homeTaskSettingRoute(":listId", ":taskId"),
    completedTask: "/cal/completed",
  },
  data: "/data",
  feedback: "/feedback",
  setting: "/setting",
  // used for rerouting some error pages
  error: "/404",
};
