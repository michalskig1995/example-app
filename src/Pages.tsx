import { Routes, Route } from "react-router-dom";

import { Home } from "./modules/Home";
import { User } from "./modules/User/components/User";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Loader } from "@mantine/core";

import { loadUsers } from "./modules/User/redux/userActions";
import {
  selectUsers,
  selectIsLoading,
  selectLoadFailed,
  selectLoadSucceeded,
} from "./modules/User/redux/userSelectors";

import { UsersTable } from "./modules/User/components/UsersTable";

export function Pages() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const isLoading = useSelector(selectIsLoading);
  const loadFailed = useSelector(selectLoadFailed);
  const loadSucceeded = useSelector(selectLoadSucceeded);

  useEffect(() => {
    if (!loadSucceeded) {
      dispatch(loadUsers());
    }
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (loadFailed) {
    return <div>Load Failed</div>;
  }

  if (loadSucceeded) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersTable users={users} />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    );
  }

  return null;
}
