import { WeekChart, listsToWeekData } from "../../components/charts/WeekChart";
import { getLists, getRandomLists } from "../mocks";

export default { title: "Charts / WeekChart", component: WeekChart };

const lists = getLists();
const data = listsToWeekData(lists);
export const base = () => <WeekChart data={data} />;

const randomData = listsToWeekData(getRandomLists(5));
export const random = () => <WeekChart data={randomData} />;
