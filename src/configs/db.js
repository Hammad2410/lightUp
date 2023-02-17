const { Client } = require('pg');

const connection = new Client({
    user: "postgres",
    password: "1DExLV2VamFgUhGEdN6Z",
    database: "postgres",
    port: 5432,
    host: "lightup.coiyz6ujjlys.ap-south-1.rds.amazonaws.com",
    ssl: { rejectUnauthorized: false }
});

connection.connect();

module.exports = connection