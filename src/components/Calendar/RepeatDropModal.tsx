import React from "react";
import { Button, Modal } from "antd";

import { Spacer } from "../Spacer";

export interface RepeatDropModalProps {
  open: boolean;

  /** when clicking mask or close button */
  onCancel: () => void;
  /** updating functions */
  updateCurrent: () => void;
  updateCurrentOnward: () => void;
  updateAll: () => void;
}

/**
 * Modal to be shown when dragging task with repeat.
 * Give users the ability to choose how other instances
 *  of this event will be affected.
 */
export const RepeatDropModal = (props: RepeatDropModalProps) => {
  const {
    open,
    onCancel,
    updateCurrent,
    updateCurrentOnward,
    updateAll
  } = props;
  return (
    <Modal
      title="Edit repeating event"
      visible={open}
      onCancel={onCancel}
      footer={null}
      width="264px"
      centered
    >
      <Button block onClick={updateCurrent}>
        Just this event
      </Button>
      <Spacer spacing="12" />
      <Button block onClick={updateCurrentOnward}>
        This and following events{" "}
      </Button>
      <Spacer spacing="12" />
      <Button block onClick={updateAll}>
        All events{" "}
      </Button>
    </Modal>
  );
};
