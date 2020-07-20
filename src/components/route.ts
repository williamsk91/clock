export const routes = {
  login: "/login",
  setting: "/setting",
  home: {
    index: "/cal",
    task: "/cal/task/:id",
    newTask: "/cal/newTask",
  },
};

export const homeTaskRoute = (id: string) => `/cal/task/${id}`;
