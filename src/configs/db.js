const { Client } = require('pg');

const connection = new Client({
    user: "postgres",
    password: "VpbVQVclj15j0mLVEkyK",
    database: "postgres",
    port: 5432,
    host: "light-up.crfv5c69uecj.ap-south-1.rds.amazonaws.com",
    ssl: { rejectUnauthorized: false }
});

connection.connect();

module.exports = connection