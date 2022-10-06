import {Role} from "@dl/shared";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {userStore} from "src/state/UserStore";

/**
 * The component that uses this hook must be encapsulated in an observer();
 */
export function useAuthedRoute(role: Role = null) {
    const router = useRouter();
    useEffect(() => {
        // * Wait for fetching to finish *
        if (userStore.fetching) return;

        if (role == null && !userStore.user.signedIn) {
            router.push("/login");
            return;
        }

        if (role != null && userStore.user.role != role || !userStore.user.signedIn) {
            router.push("/login");
            return;
        }


    }, [userStore.fetching])
}