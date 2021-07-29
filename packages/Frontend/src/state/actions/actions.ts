import { Role } from "@dl/shared";
import { ChangeUserAction, setLoadingAction, SignoutAction } from "./types";

export const signOut = (): SignoutAction => ({ type: "SIGNOUT" })

export const ChangeUser = (username: string, role: Role): ChangeUserAction => ({ type: "CHANGE_USER", payload: { username, role } })

export const setLoading = (value: boolean): setLoadingAction => ({ type: "SET_LOADING", payload: { value } });