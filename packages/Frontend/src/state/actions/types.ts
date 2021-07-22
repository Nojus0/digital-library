import { Role } from "Server/src/entity/User";

export interface LoginAction {
    type: "CHANGE_USER",
    payload: {
        username: string,
        role: Role
    }
}

export interface LogoutAction {
    type: "SIGNOUT"
}

export interface LoadingAction {
    type: "SET_LOADING"
    payload: {
        value: boolean
    }
}

export type Actions = LoginAction | LogoutAction | LoadingAction