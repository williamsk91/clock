import { Select } from "antd";

import { List } from "../../graphql/generated";

type PartialList = Pick<List, "id" | "title">;
interface Props {
  currentList?: PartialList;
  lists: PartialList[];
  updateList: (listId: string) => void;
}

export const ListSelect = (props: Props) => {
  const { currentList, lists, updateList } = props;
  return (
    <Select
      value={currentList?.id}
      onChange={(value) => updateList(value)}
      placeholder="Repeat"
      allowClear
      options={lists.map((l) => ({
        value: l.id,
        label: l.title,
      }))}
    />
  );
};
