import { AnalyticsPage } from "../Analytics/Analytics";
import { getRandomLists } from "./mocks";

export default { title: "Pages / Analytics", component: AnalyticsPage };

export const base = () => <AnalyticsPage lists={getRandomLists(6)} />;
