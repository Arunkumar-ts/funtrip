import { config as dotenvConfig } from "dotenv";
import sql, { ConnectionPool, config as SQLConfig } from "mssql";

dotenvConfig();

const dbConfig: SQLConfig = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  server: process.env.DB_SERVER as string,
  database: process.env.DB_NAME as string,
  options: {
    trustServerCertificate: true,
    enableArithAbort: true,
    trustedConnection: false,
  },
};

let pool: ConnectionPool;


export const getConnection = async (): Promise<ConnectionPool> => {
  try {
    if (!pool) {
      pool = await sql.connect(dbConfig);
      console.log("Connected to SQL Server");
    }
    return pool;
  } catch (err) {
    console.error("SQL Server connection error:", err);
    throw err;
  }
};

export { sql };
