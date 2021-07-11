import { GraphQLClient } from "graphql-request";
import { cacheExchange, createClient, dedupExchange, fetchExchange, ssrExchange } from "urql";

export const GraphQL = new GraphQLClient(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
    headers: {
        secret: process.env.DB_NOPAGINATION_SECRET,
    },
});

const isServerSide = typeof window === "undefined";

export const ssrCache = ssrExchange({ isClient: !isServerSide })

export const client = createClient({
    url: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    fetchOptions: {
        credentials: "include"
    }
});