import { Role } from "@dl/shared";

export interface ChangeUserAction {
    type: "CHANGE_USER",
    payload: {
        username: string,
        role: Role,
    }
}

export interface SignoutAction {
    type: "SIGNOUT"
}

export interface setLoadingAction {
    type: "SET_LOADING"
    payload: {
        value: boolean
    }
}

export type Actions = ChangeUserAction | SignoutAction | setLoadingAction