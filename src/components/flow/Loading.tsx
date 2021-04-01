import { Spin } from "antd";
import styled from "styled-components";

export const Loading = () => {
  return (
    <CenterLayout>
      <Spin size="large" />
    </CenterLayout>
  );
};

const CenterLayout = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -19px;
  margin-left: -16px;
`;
