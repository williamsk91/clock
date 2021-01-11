import React from "react";

import { Select } from "antd";
import styled from "styled-components";

import { EventColor, defaultEventColor, eventColors } from "../Calendar/styles";

interface Props {
  activeColor: EventColor | null;
  updateColor: (c: EventColor | null) => void;
}

/**
 * Color picker with a default color.
 */
export const ColorSelect = (props: Props) => {
  const { activeColor, updateColor } = props;

  return (
    <Select
      style={{ width: 60 }}
      value={activeColor ?? defaultEventColor}
      onChange={(c) => updateColor(c === defaultEventColor ? null : c)}
    >
      <Select.Option value={defaultEventColor}>
        <ColorBlock
          color={eventColors[defaultEventColor]}
          aria-label="color block"
        />
      </Select.Option>
      {Object.entries(eventColors).map(([key, value], i) => (
        <Select.Option key={i} value={key}>
          <ColorBlock color={value} aria-label="color block" />
        </Select.Option>
      ))}
    </Select>
  );
};

const ColorBlock = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  margin-top: 8px;

  background: ${(p) => p.color};
`;
