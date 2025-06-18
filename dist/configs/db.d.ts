import sql, { ConnectionPool } from "mssql";
export declare const getConnection: () => Promise<ConnectionPool>;
export { sql };
