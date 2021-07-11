/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.svg' {
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const content: string;

    export { ReactComponent };
    export default content;
}

declare module "*.scss"

declare module "*.graphql";

declare namespace NodeJS {
    export interface ProcessEnv {
        DB_NOPAGINATION_SECRET: string,
        NODE_ENV: string
        NEXT_PUBLIC_API_URL: string
    }
}