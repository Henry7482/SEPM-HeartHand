import dotenv from "dotenv";
dotenv.config();

const db = {
    user: process.env.MONGO_USERMAME,
    password: process.env.MONGO_PASSWORD,
    database: {
        dashboard: process.env.MONGO_DASHBOARD_DB,
        users: process.env.MONGO_USERS_DB,
    },
    ip: process.env.MONGO_IP,
}

export default db;