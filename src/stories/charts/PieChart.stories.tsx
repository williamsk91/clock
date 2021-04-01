import { PieChart, listsToPieData } from "../../components/charts/PieChart";
import { getLists } from "../mocks";

export default { title: "Charts / PieChart", component: PieChart };

export const base = () => <PieChart data={listsToPieData(getLists())} />;
