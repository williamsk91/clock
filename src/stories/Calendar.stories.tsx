import { Calendar } from "../components/Calendar/Calendar";
import { getLists, getRepeatList } from "./mocks";
import { FullPageLayout } from "./utils";

export default { title: "Calendar / Calendar" };

const mutations = {
  createCalendarTask: () => console.log("createCalendarTask"),
  updateTask: () => console.log("updateTask"),
  createTask: () => console.log("createTask"),
  updateRepeat: () => console.log("updateRepeat"),
};

export const base = () => {
  return (
    <FullPageLayout>
      <Calendar lists={getLists()} {...mutations} />
    </FullPageLayout>
  );
};

export const repeat = () => {
  return (
    <FullPageLayout>
      <Calendar lists={[getRepeatList()]} {...mutations} />
    </FullPageLayout>
  );
};
