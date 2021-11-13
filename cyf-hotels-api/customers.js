const secrets = require("./secrets");
const { Pool } = require("pg");
const pool = new Pool(secrets);

//Get all costumers
const getAllCustomers = async (req, res) => {
  try {
    let query = `SELECT * FROM customers ORDER BY name`;
    const result = await pool.query(query);
    res.status(200).send(result.rows);
  } catch (err) {
    console.log(err);
  }
};

//Get a customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const result = await pool.query(`SELECT * FROM customers WHERE id=$1`, [
      customerId,
    ]);
    res.status(201).send(result.rows);
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
      res.status(201).send(responseBody);
    }
  } catch (err) {
    console.log(err);
  }
};

//Get bookings by a customer's id
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
    res.status(200).send(selection.rows);
  } catch (err) {
    console.log(err);
  }
};

const replaceCustomerValues = (customer, newCustomer) => {
  // replace only the fields comming from newCustomer ...^
  // newCustomer does not have all the fields!
  //customer = {id: 1, email: '', ...}
  let updatedCustomer = {}; // creating the same object as customer
  for (const propertyName in customer) {
    updatedCustomer[propertyName] = customer[propertyName];
  }
  for (const propertyName in newCustomer) {
    // ONLY filling the properties that come from newCustomer
    updatedCustomer[propertyName] = newCustomer[propertyName];
  }

  return updatedCustomer;
};
const getCustomerFromDatabase = async (customerId) => {
  const result = await pool.query(`SELECT * FROM customers WHERE id=$1`, [
    customerId,
  ]);
  const dbCustomer = result.rows[0];
  return dbCustomer;
};

//Update customer's information
const updateCustomerInfo = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const requestCustomer = req.body;

    const dbCustomer = await getCustomerFromDatabase(customerId);
    const customer = replaceCustomerValues(dbCustomer, requestCustomer);

    await pool.query(
      `UPDATE customers SET email=$1, address=$2, city=$3, postcode=$4, country=$5, name=$6 WHERE id=$7`,
      [
        customer.email,
        customer.address,
        customer.city,
        customer.postcode,
        customer.country,
        customer.name,
        customer.id,
      ]
    );
    res.status(202).send(`Customer ${customerId} updated`);
  } catch (err) {
    console.log(err);
  }
};

//Delete customer
const deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    await pool.query(`DELETE FROM bookings WHERE customer_id=$1`, [customerId]);
    await pool.query(`DELETE FROM customers WHERE id=$1`, [customerId]);
    res.status(200).send(`Customer ${customerId} deleted`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  getBookingsByCustomerId,
  updateCustomerInfo,
  deleteCustomer,
};
