import { Button, Divider } from "antd";
import React, { useContext } from "react";

import { UserContext } from "../components/context/UserContext";

export const SettingRoute = () => {
  return <SettingPage />;
};

export const SettingPage = () => {
  const { signOut } = useContext(UserContext);

  return (
    <div>
      {/* <Collapse bordered={false} defaultActiveKey={["1"]}>
        <Collapse.Panel header="Account" key="1">
          <div>accounts</div>
        </Collapse.Panel>
      </Collapse> */}
      <Divider />
      <Button type="link" onClick={signOut}>
        sign out
      </Button>
    </div>
  );
};
