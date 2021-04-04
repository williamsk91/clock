import { Calendar } from "../components/Calendar/Calendar";
import { getLists, getRepeatList } from "./mocks";
import { FullPageLayout } from "./utils";

export default { title: "Calendar / Calendar" };

export const base = () => {
  return (
    <FullPageLayout>
      <Calendar
        lists={getLists()}
        updateTask={(t) => console.log("t: ", t)}
        createTask={(title) => console.log("title: ", title)}
      />
    </FullPageLayout>
  );
};

export const repeat = () => {
  return (
    <FullPageLayout>
      <Calendar
        lists={[getRepeatList()]}
        updateTask={(t) => console.log("t: ", t)}
        createTask={(title) => console.log("title: ", title)}
      />
    </FullPageLayout>
  );
};
