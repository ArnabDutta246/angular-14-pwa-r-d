export interface I_IDB_TABLE {
    tableVersion: number;
    tableName: string[];
}
export enum ALL_TABLE_NAME {
    USER_INFO = "user-info",
    CART = "cart-info",
    OFFER = "offer-info",
    PRODUCT = "product-info"
}
export const IDB_DB_NAME: string = 'IDB_TABLENAME';
export const IDB_CURRENT_VERSION: number = 2;

export const Indexed_tables: I_IDB_TABLE[] = [
    {
        tableVersion: 1,
        tableName: [
            ALL_TABLE_NAME.USER_INFO,
            ALL_TABLE_NAME.CART,
            ALL_TABLE_NAME.PRODUCT
        ]
    },
    /***************[Add new tables here]*************************/
    //{ tableVersion: 1, tableName: ['erro-api'] },
]