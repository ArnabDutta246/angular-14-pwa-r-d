export interface I_API_RESPONSE<G> {
    data: G;
    status: 200 | 401 | 404 | 500 | number;
    message: string;
    paging: any;
}
export interface I_EXTRA_HEADERS {
    [key: string]: any
}
