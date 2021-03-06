import { cacheExchange, createClient, dedupExchange, fetchExchange, ssrExchange } from "urql";

export const isServerSide = typeof window === "undefined";

export const isClientSide = typeof window !== "undefined";

export const ssrCache = ssrExchange({ isClient: !isServerSide })

export const client = createClient({
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    fetchOptions: {
        credentials: "include"
    }
});