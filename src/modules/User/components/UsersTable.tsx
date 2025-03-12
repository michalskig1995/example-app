import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IconPencil, IconTrash } from "@tabler/icons-react";
import { ActionIcon, Anchor, Avatar, Group, Table, Text } from "@mantine/core";

import { deleteUser } from "../../../modules/User/redux";

import type { Dispatch } from "redux";
import type { UserActionTypes } from "../../../modules/User/redux";
import type { User } from "../../../modules/User/types/User";

type UserTableProps = {
  users: User[];
};

export function UsersTable(props: UserTableProps) {
  const { users } = props;
  const dispatch = useDispatch<Dispatch<UserActionTypes>>();
  const navigate = useNavigate();

  function removeUser(userId: number) {
    dispatch(deleteUser(userId));
  }

  const rows = users.map((user) => (
    <Table.Tr key={user.name}>
      <Table.Td>
        <Group gap="sm">
          <Avatar
            size={30}
            src={`https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-${user.id}.png`}
            radius={30}
          />
          <Text fz="sm" fw={500}>
            {user.name}
          </Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Anchor component="button" size="sm">
          {user.email}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{user.phone}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon
            variant="subtle"
            color="gray"
            onClick={() => {
              navigate(`/users/${user.id}`);
            }}
          >
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() => {
              removeUser(user.id);
            }}
          >
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Employee</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
