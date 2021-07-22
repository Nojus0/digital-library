import { Actions } from "./actions/types";
import { createContext, useContext, useEffect, useReducer } from "react";
import { useCurrentUserQuery } from "../graphql/user/currentUser";

export enum Role {
    Consumer = 0,
    Administrator = 1,
}

interface IUser {
    username: string
    role: Role
    fetching: boolean
}

const UserContext = createContext<ReturnType<typeof useProvideUser>>(null);

const initialState: IUser = {
    username: null,
    role: null,
    fetching: true
}

const useProvideUser = () => {

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
    const [{ data, fetching }] = useCurrentUserQuery();
    const [state, dispatch] = useProvideUser();

    useEffect(() => {
        dispatch({ type: "SET_LOADING", payload: { value: fetching } });

        if (fetching || data?.currentUser == null) return;

        dispatch({
            type: "CHANGE_USER", payload: {
                username: data.currentUser.username,
                role: Role[data.currentUser.role]
            }
        });


    }, [fetching])

    return (
        <UserContext.Provider value={[state, dispatch]}>
            {children}
        </UserContext.Provider>
    )
}