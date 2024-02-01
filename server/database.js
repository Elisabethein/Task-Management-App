const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "sql",
    database: "taskManagement",
    host: "localhost",
    port: "5432"
});


const execute = async(query1, query2, query3) => {
    try {
        await pool.connect();
        await pool.query(query1);
        await pool.query(query2);
        await pool.query(query3);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const createTblQuery1 = `
    CREATE TABLE IF NOT EXISTS "courses" (
	    "id" SERIAL PRIMARY KEY,         
	    "coursename" VARCHAR(200) NOT NULL,
        "userid" VARCHAR(200)
    );`;

const createTblQuery2 = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL 
    );`;

const createTblQuery = `
    CREATE TABLE IF NOT EXISTS "tasks" (
	    id SERIAL PRIMARY KEY,         
	    courseid INTEGER NOT NULL,
        description VARCHAR(250) NOT NULL,
        end_date VARCHAR(200),
        crossedOut boolean NOT NULL
    );`;


execute(createTblQuery1, createTblQuery, createTblQuery2).then(result => {
    if (result) {
        console.log('If does not exist, tables are created');
    }
});

module.exports = pool;