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
        S3_BUCKET: string
        S3_REGION: string
    }
}