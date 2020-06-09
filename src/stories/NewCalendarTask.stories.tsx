import React from "react";
import { MemoryRouter } from "react-router-dom";
import { addHours } from "date-fns";

import { NewCalendarTask } from "../components/NewCalendarTask";
import { SidebarOnlyLayout } from "./utils";

export default {
  title: "Components / NewCalendarTask",
  component: NewCalendarTask
};

export const base = () => (
  <MemoryRouter
    initialEntries={[
      {
        pathname: "/",
        state: {
          date: {
            start: new Date(),
            end: addHours(new Date(), 3),
            includeTime: true
          }
        }
      }
    ]}
    initialIndex={0}
  >
    <SidebarOnlyLayout>
      <NewCalendarTask
        onCancel={() => console.log("cancel")}
        onConfirm={(title, start, end, includeTime) => {
          console.log("title: ", title);
          console.log("start: ", start);
          console.log("end: ", end);
          console.log("includeTime: ", includeTime);
        }}
      />
    </SidebarOnlyLayout>
  </MemoryRouter>
);
