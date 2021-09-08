declare namespace NodeJS {
    export interface ProcessEnv {
        DB_NOPAGINATION_SECRET: string,
        NODE_ENV: string
        HOST: string
        DB_PORT: string
        USER: string
        PASSWORD: string
        DATABASE: string
        SECRET: string
        ORIGIN: string
        AWS_BUCKET: string
        AWS_ACCESS_KEY_ID: string
        AWS_SECRET_ACCESS_KEY: string
        AWS_DEFAULT_REGION: string
    }
}