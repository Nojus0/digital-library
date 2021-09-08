export interface uploadCover {
    url: string;
    fields: {
        "Content-Type": string;
        acl: string;
        "x-amz-meta-userid": string;
        "X-Amz-Signature": string;
        Policy: string;
        "X-Amz-Date": string;
        "X-Amz-Credential": string;
        "X-Amz-Algorithm": string;
        bucket: string;
        key: string;
    }

}