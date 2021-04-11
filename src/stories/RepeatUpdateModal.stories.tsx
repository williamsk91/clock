import { RepeatUpdateModal } from "../components/RepeatUpdateModal";

export default {
  title: "Components / RepeatUpdateModal",
  component: RepeatUpdateModal,
};

export const base = () => (
  <RepeatUpdateModal
    onCancel={() => console.log("cancel")}
    onUpdate={() => console.log("update")}
  />
);
