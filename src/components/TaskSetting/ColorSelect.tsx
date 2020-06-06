import React from "react";
import { Select } from "antd";
import styled from "styled-components";

import { defaultEventColor, eventColors } from "../Calendar/styles";

interface Props {
  activeColor: string | null;
  updateColor: (c: string | null) => void;
}

/**
 * Select color for the task. Defaults to fullcalendar default color.
 */
export const ColorSelect = (props: Props) => {
  const { activeColor, updateColor } = props;
  return (
    <Select
      style={{ width: 60 }}
      defaultValue={activeColor ?? defaultEventColor}
      onChange={c => updateColor(c === defaultEventColor ? null : c)}
    >
      <Select.Option value={defaultEventColor}>
        <ColorBlock color={defaultEventColor} aria-label="color block" />
      </Select.Option>
      {eventColors.map((ec, i) => (
        <Select.Option key={i} value={ec}>
          <ColorBlock color={ec} aria-label="color block" />
        </Select.Option>
      ))}
    </Select>
  );
};

const ColorBlock = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  margin-top: 8px;

  background: ${p => p.color};
`;
