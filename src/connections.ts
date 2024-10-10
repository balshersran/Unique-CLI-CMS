
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: process.env.DB_NAME,
    port: 5432,
});

const connectToDb = async () => {
    try{
        await pool.connect();
        console.log('Connected to Database.');
    }catch(err){
        console.log('Error Connecting to Database:', err)
        process.exit[1];
    }
};

export { Pool, connectToDb };