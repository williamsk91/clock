import { useContext } from "react";
import { Button, Popconfirm } from "antd";

import { Text, TrackWithRoutes } from "../components";
import { UserContext } from "../components/context/UserContext";
import { Spacer } from "../components/Spacer";
import { FullPage } from "../components/styles/layout";
import { apolloClient } from "../data/apollo";
import { useDeleteUserMutation } from "../graphql/generated";

export const SettingRoute = () => {
  const { signOut, setSignedIn } = useContext(UserContext);

  const [deleteUser] = useDeleteUserMutation({
    onCompleted: () => {
      setSignedIn(false);
      apolloClient.clearStore();
    },
  });

  return <SettingPage signOut={signOut} deleteUser={deleteUser} />;
};

interface Props {
  signOut: () => void;
  deleteUser: () => void;
}

export const SettingPage = (props: Props) => {
  const { signOut, deleteUser } = props;

  return (
    <FullPage.Container>
      <TrackWithRoutes />
      <FullPage.Content>
        <Text.Title>Settings</Text.Title>
        <Spacer spacing="60" />

        <Text.SubTitle>Accounts</Text.SubTitle>
        <Spacer spacing="12" />
        <Button type="primary" onClick={signOut}>
          Sign out
        </Button>
        <Spacer spacing="60" />

        <Text.SubTitle>Danger Zone</Text.SubTitle>
        <Spacer spacing="12" />
        <Popconfirm
          title="This is not a reversible action!"
          okText="Yes, delete my account forever"
          onConfirm={() => deleteUser()}
          okType="danger"
          placement="right"
        >
          <Button type="primary" danger>
            Delete Account
          </Button>
        </Popconfirm>
      </FullPage.Content>
    </FullPage.Container>
  );
};
