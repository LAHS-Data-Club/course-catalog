import { Pool } from "pg";
import { config } from 'dotenv';
config();

const pool = new Pool({
	port: 5432,
	database: 'test', // TODO: env not working
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD
});

export default pool;
