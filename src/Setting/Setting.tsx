import { Button, Collapse, Divider, Popconfirm } from "antd";
import React, { useContext } from "react";

import { Layout } from "../components/styles/layout";
import { UserContext } from "../components/context/UserContext";
import { apolloClient } from "../data/apollo";
import { useDeleteUserMutation } from "../graphql/generated";

export const SettingRoute = () => {
  return <SettingPage />;
};

export const SettingPage = () => {
  const { signOut, setSignedIn } = useContext(UserContext);

  const [deleteUser] = useDeleteUserMutation({
    onCompleted: () => {
      setSignedIn(false);
      apolloClient.clearStore();
    }
  });

  return (
    <Layout>
      <Collapse bordered={false} defaultActiveKey={["1"]}>
        <Collapse.Panel header="Account" key="1">
          <div>Danger Zone</div>
          <Popconfirm
            title="This is not a reversible action!"
            okText="Yes, delete my account forever"
            onConfirm={() => deleteUser()}
            okType="danger"
            placement="right"
          >
            <Button>Delete Account</Button>
          </Popconfirm>
        </Collapse.Panel>
      </Collapse>
      <Divider />
      <Button type="link" onClick={signOut}>
        sign out
      </Button>
    </Layout>
  );
};
