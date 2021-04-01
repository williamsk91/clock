import { NewItem } from "../components/NewItem";
import { Mini } from "../components/styles/layout";

export default { title: "Components / NewItem" };

export const newTask = () => (
  <Mini.Container>
    <NewItem
      placeholder="Add a new task"
      createItem={(title) => console.log("title: ", title)}
    />
  </Mini.Container>
);

export const newList = () => (
  <Mini.Container>
    <NewItem
      placeholder="Add a new list"
      createItem={(title) => console.log("title: ", title)}
    />
  </Mini.Container>
);
