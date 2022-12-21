export interface I_API_RESPONSE<G> {
    data: G | G[] | null;
    status: 200 | 401 | 404 | 500 | number;
    message: string;
    paging: any;
}