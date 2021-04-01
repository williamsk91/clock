import { CheckSquareOutlined } from "@ant-design/icons";

import { Overview } from "../components/Overview";

export default { title: "Components / Overview", component: Overview };

export const base = () => (
  <Overview
    title="10"
    subtitle="/ 20 tasks completed"
    icon={<CheckSquareOutlined />}
  />
);
