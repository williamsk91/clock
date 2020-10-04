import React, { useState } from "react";

import { ListSettingSidebar } from "../../Home/Sidebar/ListSettingSidebar";
import { getList } from "../mocks";
import { SidebarOnlyLayout } from "../utils";

export default {
  title: "Sidebar / ListSetting",
  component: ListSettingSidebar,
};

const Base = () => {
  const [list, setList] = useState(getList());

  return <ListSettingSidebar list={list} updateList={(uli) => setList(uli)} />;
};

export const base = () => (
  <SidebarOnlyLayout>
    <Base />
  </SidebarOnlyLayout>
);
