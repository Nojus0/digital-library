import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { userStore } from "src/state/UserStore";

export function useAuthedRoute() {
    const router = useRouter();

    useEffect(() => {

        if (!userStore.fetching && !userStore.user.signedIn)
            router.push("/login");

    }, [userStore.fetching])
}