const express = require("express");
const app = express();
const secrets = require("./secrets");
const { Pool } = require("pg");
const pool = new Pool(secrets);

app.use(express.json());

//Get all hotels
const getAllHotels = async (req, res) => {
  try {
    const selectionOfRows = await pool.query("SELECT * FROM hotels");
    await res.json(selectionOfRows.rows);
  } catch (err) {
    console.log(err);
  }
};

//Create a hotel
const createHotel = async (req, res) => {
  try {
    const newHotelName = req.body.name;
    const newHotelRooms = req.body.rooms;
    const newHotelPostcode = req.body.postcode;

    if (!Number.isInteger(newHotelRooms) || newHotelRooms <= 0) {
      return res
        .status(400)
        .send("The number of rooms should be a positive integer.");
    }

    const result = await pool.query("SELECT * FROM hotels WHERE name=$1", [
      newHotelName,
    ]);

    if (result.rows.length > 0) {
      return res
        .status(400)
        .send("An hotel with the same name already exists!");
    } else {
      const query =
        "INSERT INTO hotels (name, rooms, postcode) VALUES ($1, $2, $3) returning id";
      const insertResult = await pool.query(query, [
        newHotelName,
        newHotelRooms,
        newHotelPostcode,
      ]);
      const responseBody = { hotelId: insertResult.rows[0].id };

      res.send(responseBody);
    }
  } catch (err) {
    console.log(err);
  }
};

//Create a customer
const createCustomer = async (req, res) => {
  try {
    const newCustomerName = req.body.name;
    const newCustomerEmail = req.body.email;
    const newCustomerAddress = req.body.address;
    const newCustomerCity = req.body.city;
    const newCustomerPostcode = req.body.postcode;
    const newCustomerCountry = req.body.country;

    const result = await pool.query("SELECT * FROM customers WHERE name=$1", [
      newCustomerName,
    ]);
    if (result.rows.length > 0) {
      return res
        .status(400)
        .send("An customer with the same name already exists!");
    } else {
      const query =
        "INSERT INTO customers (name, email, address, city, postcode, country) VALUES ($1, $2, $3, $4, $5, $6) returning id";
      const insertResult = await pool.query(query, [
        newCustomerName,
        newCustomerEmail,
        newCustomerAddress,
        newCustomerCity,
        newCustomerPostcode,
        newCustomerCountry,
      ]);
      const responseBody = { customerId: insertResult.rows[0].id };
      res.status(201).json(responseBody);
    }
  } catch (err) {
    console.log(err);
  }
};

const getBookingsByCustomerId = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const selection = await pool.query(
      `SELECT b.checkin_date, b.nights, h.name as hotelName, h.postcode, c.name as customerName FROM bookings b
        inner join hotels h on h.id = b.hotel_id
        inner join customers c on c.id = b.customer_id 
        where customer_id = $1`,
      [customerId]
    );
    await res.json(selection.rows);
  } catch (err) {
    console.log(err);
  }
};

app.get("/hotels", getAllHotels);
app.post("/hotels", createHotel);
app.post("/customers", createCustomer);
app.get("/customers/:customerId/bookings", getBookingsByCustomerId);

const PORT = 3000;
app.listen(PORT, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
