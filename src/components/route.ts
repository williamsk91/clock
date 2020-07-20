export const routes = {
  login: "/login",
  setting: "/setting",
  home: {
    index: "/cal",
    task: "/cal/task/:id",
    newTask: "/cal/newTask",
  },
  // used for rerouting some error pages
  error: "/404",
};

export const homeTaskRoute = (id: string) => `/cal/task/${id}`;
