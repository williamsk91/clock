import { DatePicker as AntDatePicker } from "antd";
import React from "react";
import moment from "moment";

interface Props {
  start?: Date;
  setStart: (d?: Date) => void;
}

export const DatePicker = (props: Props) => {
  const { start, setStart } = props;

  return (
    <AntDatePicker
      showTime={{ format: "HH:mm" }}
      format="YYYY/MM/DD HH:mm"
      allowClear
      value={start ? moment(start) : undefined}
      onChange={(_date, dateString) => {
        console.log("dateString: ", dateString);
        setStart(dateString === "" ? undefined : new Date(dateString));
      }}
      bordered={false}
      renderExtraFooter={undefined}
    />
  );
};
