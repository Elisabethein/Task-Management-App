const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "sql", // Enter your password here
    database: "taskManagement", //Try to use the same name for your database
    host: "localhost",
    port: "5432"
});


const execute = async(query1, query2, query3) => {
    try {
        await pool.connect(); // gets connection
        await pool.query(query1); // sends queries
        await pool.query(query2); // sends queries
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

// Execute each CREATE TABLE statement in a separate transaction
execute(createTblQuery1, createTblQuery, createTblQuery2).then(result => {
    if (result) {
        console.log('If does not exist, tables are created');
    }
});
 

const execute2 = async (query) => {
    try {
        await pool.query(query);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

process.on('SIGINT', async () => {
    console.log('Process interrupted. Cleaning up...');
    try {
        // Cleanup: Drop tables if they exist
        await execute2('DROP TABLE IF EXISTS "tasks" CASCADE;');
    } catch (error) {
        console.error('Error during cleanup:', error);
    } finally {
        await pool.end(); // Close the pool before exiting
        process.exit(); // Exit the process
    }
});


module.exports = pool;