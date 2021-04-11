import { useState } from "react";
import { Modal, Radio } from "antd";
import styled from "styled-components";

import { RepeatUpdateType } from "./Calendar/eventUpdate";

interface Props {
  onCancel: () => void;
  onUpdate: (updateType: RepeatUpdateType) => void;
}

export const RepeatUpdateModal = (props: Props) => {
  const { onCancel, onUpdate } = props;

  const [isVisible, setIsVisible] = useState(true);
  const [updateType, setUpdateType] = useState(RepeatUpdateType.ThisOne);

  return (
    <Modal
      title="Update repeat event"
      visible={isVisible}
      okText="update event"
      onCancel={() => {
        setIsVisible(false);
        onCancel();
      }}
      onOk={() => {
        setIsVisible(false);
        onUpdate(updateType);
      }}
      width={300}
      closable={false}
    >
      <Radio.Group
        onChange={(e) => setUpdateType(e.target.value)}
        value={updateType}
      >
        <VerticalRadio value={RepeatUpdateType.ThisOne}>
          Just this event
        </VerticalRadio>
        <VerticalRadio value={RepeatUpdateType.FromNow}>
          From now on
        </VerticalRadio>
        <VerticalRadio value={RepeatUpdateType.All}>All events</VerticalRadio>
      </Radio.Group>
    </Modal>
  );
};

const VerticalRadio = styled(Radio)`
  display: block;
`;
