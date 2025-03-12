import { Provider } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";

import { mockUsers } from "../../data";
import { UsersTable } from "../UsersTable";

jest.mock("redux-observable", () => ({
  createEpicMiddleware: jest.fn().mockReturnValue({
    run: jest.fn(),
  }),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

jest.mock("@mantine/core", () => {
  const actualMantine = jest.requireActual("@mantine/core");

  return {
    ...actualMantine,
    Table: {
      ...actualMantine.Table,
      ScrollContainer: jest.fn(({ children }) => <div>{children}</div>),
      Thead: jest.fn(({ children }) => <thead>{children}</thead>),
      Tr: jest.fn(({ children }) => <tr>{children}</tr>),
      Th: jest.fn(({ children }) => <th>{children}</th>),
      Tbody: jest.fn(({ children }) => <tbody>{children}</tbody>),
      Td: jest.fn(({ children }) => <td>{children}</td>),
    },
    Group: jest.fn(({ children }) => <div>{children}</div>),
    Avatar: jest.fn(() => <div data-testid="mock-avatar" />),
    ActionIcon: jest.fn(({ children, onClick }) => (
      <button onClick={onClick} data-testid="mock-action-icon">
        {children}
      </button>
    )),
    Text: jest.fn(({ children }) => <span>{children}</span>),
    Anchor: jest.fn(({ children }) => <a>{children}</a>),
  };
});

const initialState = {
  users: mockUsers,
};

const mockStore = configureStore({
  reducer: (state = initialState) => state,
});

function renderWrapper() {
  return render(
    <Provider store={mockStore}>
      <MantineProvider theme={{}}>
        <UsersTable users={mockUsers} />
      </MantineProvider>
    </Provider>
  );
}

test("renders the users table with user data", () => {
  const { container } = renderWrapper();

  expect(container).toMatchSnapshot();
});
