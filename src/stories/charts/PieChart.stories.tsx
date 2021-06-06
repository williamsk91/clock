import { PieChart, listsToPieData } from "../../components/charts/PieChart";
import { getLists, getRandomLists } from "../mocks";

export default { title: "Charts / PieChart", component: PieChart };

export const base = () => <PieChart data={listsToPieData(getLists())} />;

const randomData = listsToPieData(getRandomLists(5));
export const random = () => <PieChart data={randomData} />;
