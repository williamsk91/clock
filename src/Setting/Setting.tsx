import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Collapse, Popconfirm } from "antd";

import { UserContext } from "../components/context/UserContext";
import { Spacer } from "../components/Spacer";
import { MiniLayout } from "../components/styles/layout";
import { apolloClient } from "../data/apollo";
import { useDeleteUserMutation } from "../graphql/generated";

export const SettingRoute = () => {
  return <SettingPage />;
};

export const SettingPage = () => {
  const history = useHistory();

  const { signOut, setSignedIn } = useContext(UserContext);

  const [deleteUser] = useDeleteUserMutation({
    onCompleted: () => {
      setSignedIn(false);
      apolloClient.clearStore();
    }
  });

  return (
    <MiniLayout>
      <Button
        icon={<LeftOutlined />}
        type="primary"
        onClick={() => history.push("/")}
      >
        Go back
      </Button>
      <Spacer spacing="24" />
      <Collapse bordered={false}>
        <Collapse.Panel header="Account" key="1">
          <strong>Danger Zone</strong>
          <Spacer spacing="3" />
          <Popconfirm
            title="This is not a reversible action!"
            okText="Yes, delete my account forever"
            onConfirm={() => deleteUser()}
            okType="danger"
            placement="right"
          >
            <Button type="danger">Delete Account</Button>
          </Popconfirm>
        </Collapse.Panel>
      </Collapse>
      <Spacer spacing="12" />
      <Button onClick={signOut}>Sign out</Button>
    </MiniLayout>
  );
};
