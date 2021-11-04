const express = require("express");
const app = express();
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "hotel",
  password: "Blanket25",
  port: 5432,
});

//Get all hotels
const getAllHotels = (req, res) => {
  pool.query("SELECT * FROM hotels", (error, result) => {
    res.json(result.rows);
  });
};

//Get all customers
const getAllCustomers = (req, res) => {
  pool.query("SELECT * FROM customers", (error, result) => {
    res.json(result.rows);
  });
};

//Get all bookings
const getAllBookings = (req, res) => {
  pool.query("SELECT * FROM bookings", (error, result) => {
    res.json(result.rows);
  });
};

app.get("/hotels", getAllHotels);
app.get("/customers", getAllCustomers);
app.get("/bookings", getAllBookings);

const PORT = 3000;
app.listen(PORT, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
