import { List, useUserListQuery } from "../graphql/generatedGraphql";
import React, { FC, createContext, useEffect, useState } from "react";

type ListTitle = Pick<List, "id" | "title">[] | undefined;

export const UserListContext = createContext<ListTitle>(undefined);

export const UserListProvider: FC = ({ children }) => {
  const [userLists, setUserLists] = useState<ListTitle>();

  const { data } = useUserListQuery();

  useEffect(() => {
    setUserLists(data?.userList);
  }, [data]);

  return (
    <UserListContext.Provider value={userLists}>
      {children}
    </UserListContext.Provider>
  );
};
