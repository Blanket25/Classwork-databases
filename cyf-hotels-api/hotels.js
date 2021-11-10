const secrets = require("./secrets");
const { Pool } = require("pg");
const pool = new Pool(secrets);

//Get all hotels
const getAllHotels = async (req, res) => {
  try {
    const hotelNameQuery = req.query.name;
    let query = `SELECT * FROM hotels ORDER BY name`;
    if (hotelNameQuery) {
      query = `SELECT * FROM hotels WHERE name LIKE '%${hotelNameQuery}%' ORDER BY name`;
    }
    const result = await pool.query(query);
    await res.status(200).send(result.rows);
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

      await res.status(201).send(responseBody);
    }
  } catch (err) {
    console.log(err);
  }
};

//Get a hotel by it's id
const getHotelById = async (req, res) => {
  try {
    const hotelId = req.params.hotelId;
    const result = await pool.query(`SELECT * FROM hotels WHERE id=$1`, [
      hotelId,
    ]);
    await res.status(200).send(result.rows);
  } catch (err) {
    console.log(err);
  }
};

//Delete a hotel
const deleteHotel = async (req, res) => {
  try {
    const hotelId = req.params.hotelId;
    await pool.query(`DELETE FROM bookings WHERE hotel_id=$1`, [hotelId]);
    await pool.query(`DELETE FROM hotels WHERE id=$1`, [hotelId]);
    await res.status(200).send(`Hotel ${hotelId} deleted`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllHotels,
  createHotel,
  getHotelById,
  deleteHotel,
};
