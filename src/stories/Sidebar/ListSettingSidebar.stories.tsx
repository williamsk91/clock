import { useState } from "react";

import { List } from "../../graphql/generated";
import { ListSettingSidebar } from "../../Home/Sidebar/ListSettingSidebar";
import { getList } from "../mocks";
import { SidebarOnlyLayout } from "../utils";

export default {
  title: "Sidebar / ListSetting",
  component: ListSettingSidebar,
};

const Base = () => {
  const [list, setList] = useState<Omit<List, "tasks">>(getList());

  return (
    <ListSettingSidebar
      list={list}
      updateList={(uli) => setList({ ...uli, deleted: null })}
      deleteList={() => console.log("deleteList")}
    />
  );
};

export const base = () => (
  <SidebarOnlyLayout>
    <Base />
  </SidebarOnlyLayout>
);
