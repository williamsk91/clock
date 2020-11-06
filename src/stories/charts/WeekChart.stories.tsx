import React from "react";

import { WeekChart, listsToWeekData } from "../../components/charts/WeekChart";
import { getRandomLists } from "../mocks";

export default { title: "Charts / WeekChart", component: WeekChart };

const data = listsToWeekData(getRandomLists(5));

export const base = () => <WeekChart data={data} />;
