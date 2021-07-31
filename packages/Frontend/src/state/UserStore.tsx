import { currentUserQuery, ICurrentUser } from "src/graphql/user/currentUser";
import { Role } from "@dl/shared";
import { client } from "src/next/graphql";
import { configure, makeAutoObservable } from "mobx";
import { ISignout, signoutMutation } from "src/graphql/user/signout";
import { ILogin, ILoginVariables, loginMutation } from "src/graphql/user/login";
import { IRegister, IRegisterVariables, registerMutation } from "src/graphql/user/register";
import { IRegisterDetails } from "pages/register";

interface IUser {
    username: string
    role: Role
    signedIn: boolean
}

configure({
    enforceActions: "never",
})

class UserStore {
    user: IUser
    fetching: boolean

    constructor() {
        this.fetching = true;
        this.user = {
            role: null,
            signedIn: false,
            username: null
        }

        makeAutoObservable(this);
        this.fetchCurrentUser();
    }

    async fetchCurrentUser() {
        const { data, error } = await client.query<ICurrentUser>(currentUserQuery).toPromise();

        if (error || data?.currentUser == null) {
            this.fetching = false;
            this.user.signedIn = false;
            return;
        }

        const { username, role } = data.currentUser

        this.fetching = false;
        this.user = {
            username,
            role: Role[role],
            signedIn: true
        }

    }

    async changeUser(user: ILoginVariables) {
        const { data, error } = await client.mutation<ILogin, ILoginVariables>(loginMutation, user).toPromise();

        if (error) return "Cannot connect to server.";

        if (data.login.user == null) return data.login.error;

        const { role, username } = data.login.user

        this.user = {
            signedIn: true,
            role: Role[role],
            username: username
        }
    }

    async signOut() {
        await client.mutation<ISignout>(signoutMutation).toPromise();
        this.user.signedIn = false;
    }

    async register({ username, email, password, confirmPassword }: IRegisterDetails) {
        if (email.length < 3) return "Email too short."
        if (username.length < 3) return "Username too short."
        if (password.length < 3) return "Password too short."
        if (email.length < 3 || !email.includes("@") || !email.includes(".")) return "Invalid email address."
        if (password != confirmPassword) return "Passwords do not match."

        const { data, error } = await client.mutation<IRegister, IRegisterVariables>(
            registerMutation,
            { email, password, username }
        ).toPromise()

        if (error || data.register.error) return data.register.error || "Cannot connect to server."

    }
}
export const userStore = new UserStore();