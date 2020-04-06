import { DatePicker as AntDatePicker, Switch } from "antd";

import { ClockCircleOutlined } from "@ant-design/icons";
import React from "react";
import moment from "moment";

interface Props {
  start?: Date;
  setStart: (d?: Date) => void;

  hasTime: boolean;
  setHasTime: (ht: boolean) => void;
}

export const DatePicker = (props: Props) => {
  const { start, setStart, hasTime, setHasTime } = props;

  return (
    <AntDatePicker
      showTime={hasTime ? { format: "HH:mm" } : false}
      format={hasTime ? "YYYY/MM/DD HH:mm" : "YYYY/MM/DD"}
      allowClear
      value={start && moment(start)}
      onChange={(_date, dateString) => {
        const date = dateString === "" ? undefined : new Date(dateString);
        setStart(date);
      }}
      showToday={false}
      bordered={false}
      renderExtraFooter={() => (
        <Switch
          checked={hasTime}
          onChange={(c) => setHasTime(c)}
          checkedChildren={<ClockCircleOutlined />}
          unCheckedChildren={<ClockCircleOutlined />}
        />
      )}
    />
  );
};
