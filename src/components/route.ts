export const routes = {
  login: "/login",
  setting: "/setting",
  home: {
    index: "/cal",
    list: "/list/:listId",
    tasks: "cal/tasks/:listId",
    task: "/cal/task/:taskId",
    newTask: "/cal/newTask",
  },
  // used for rerouting some error pages
  error: "/404",
};

export const homeTaskRoute = (id: string) => `/cal/task/${id}`;
