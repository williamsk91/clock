import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

import homeImg from "../assets/undraw_at_home_octe.svg";
import { UserContext } from "../components/context/UserContext";
import { routes } from "../components/route";
import { Spacer } from "../components/Spacer";
import { Mini } from "../components/styles/layout";
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
    },
  });

  return (
    <Mini.Container>
      <Mini.Illustration src={homeImg} />
      <Spacer spacing="24" />
      <Button
        icon={<CloseOutlined />}
        type="link"
        onClick={() => history.push(routes.home.index)}
      >
        Go back
      </Button>
      <Spacer spacing="12" />
      <Popconfirm
        title="This is not a reversible action!"
        okText="Yes, delete my account forever"
        onConfirm={() => deleteUser()}
        okType="danger"
        placement="right"
      >
        <Button type="link" danger>
          Delete Account
        </Button>
      </Popconfirm>
      <Spacer spacing="12" />
      <Button type="text" onClick={signOut}>
        Sign out
      </Button>
    </Mini.Container>
  );
};
