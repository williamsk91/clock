import { ListTooltip } from "../../components/charts/ListTooltip";

export default { title: "Charts / ListTooltip", component: ListTooltip };

export const base = () => (
  <ListTooltip
    listTitle="Study"
    tasks={{
      CS: {
        hours: 3,
        color: "green",
      },
      Japanese: {
        hours: 4,
        color: "purple",
      },
      Comp: {
        hours: 6,
        color: "lime",
      },
      Code: {
        hours: 0.5,
        color: "lightBlue",
      },
    }}
  />
);
