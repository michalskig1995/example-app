import { TestScheduler } from "rxjs/testing";
import { loadUsersEpic } from "../userEpic";
import { types, loadUsersSuccess, loadUsersFailure } from "../userActions";
import { getUsers } from "../../api/getUsers";

import { mockUsers } from "../../data/mockUsers";

jest.mock("../../api/getUsers");

describe("loadUsersEpic", () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it("dispatches loadUsersSuccess when getUsers API succeeds", () => {
    (getUsers as jest.Mock).mockResolvedValue(mockUsers);

    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot("-a", { a: { type: types.LOAD_USERS } });
      const response$ = cold("--a", { a: mockUsers });
      (getUsers as jest.Mock).mockReturnValue(response$);

      const output$ = loadUsersEpic(action$);

      expectObservable(output$).toBe("---a", {
        a: loadUsersSuccess(mockUsers),
      });
    });
  });

  it("dispatches loadUsersFailure when getUsers API fails", () => {
    const mockError = new Error("Network error");

    (getUsers as jest.Mock).mockRejectedValue(mockError);

    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot("-a", { a: { type: types.LOAD_USERS } });
      const response$ = cold("--#", {}, mockError);
      (getUsers as jest.Mock).mockReturnValue(response$);

      const output$ = loadUsersEpic(action$);

      expectObservable(output$).toBe("---a", {
        a: loadUsersFailure(mockError.message),
      });
    });
  });
});
