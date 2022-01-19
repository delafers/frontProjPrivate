import {follow, unfollow} from "./support_reducer";
import {usersAPI} from "../api/usersAPI";
import {APIResponseType} from "../api/api";
import {ResultCodesEnum} from "../api/authAPI";

jest.mock("../api/usersAPI")

const UserApiMock = usersAPI as jest.Mocked<typeof usersAPI>
const Result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {resultCode: 200}
}
const dispatchMock = jest.fn()
const getStateMock = jest.fn()
beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    UserApiMock.follow.mockClear()
    UserApiMock.unfollow.mockClear()
})
// @ts-ignore
UserApiMock.follow.mockReturnValue(Promise.resolve(Result))

test("thunk follow", async () => {
    const thunk = follow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
})
test("thunk unfollow", async () => {
    const thunk = unfollow(2)
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
})