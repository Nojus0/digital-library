import { Actions } from "./actions/types";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { currentUserQuery, ICurrentUser } from "../graphql/user/currentUser";
import { Role } from "@dl/shared";
import { useQuery } from "urql";
import { client, isServerSide } from "src/next/graphql";
import { ChangeUser, setLoading } from "./actions/actions";

interface IUser {
    username: string
    role: Role
    fetching: boolean
}

const UserContext = createContext<ReturnType<typeof useProvideUser>>(null);

const useProvideUser = () => {

    const initialState: IUser = {
        username: null,
        role: null,
        fetching: true,
    }

    function reducer(state: IUser, action: Actions): IUser {
        switch (action.type) {
            case "CHANGE_USER":
                return { ...state, ...action.payload };
            case "SIGNOUT":
                return { ...initialState, fetching: false }
            case "SET_LOADING":
                return { ...state, fetching: action.payload.value }
            default:
                return state;
        }
    }
    return useReducer(reducer, initialState);
}

export const useUser = () => useContext(UserContext);

export function UserContextProvider({ children }) {

    const [state, dispatch] = useProvideUser();

    async function setCurrentUser() {
        const { data, error } = await client.query<ICurrentUser>(currentUserQuery).toPromise();

        if (error || data.currentUser == null) return dispatch(setLoading(false));

        const { currentUser: { username, role } } = data;

        dispatch(ChangeUser(username, Role[role]))
    }

    useEffect(() => { setCurrentUser() }, [])
    return (
        <UserContext.Provider value={[state, dispatch]}>
            {children}
        </UserContext.Provider>
    )
}