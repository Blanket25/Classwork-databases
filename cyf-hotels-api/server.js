const express = require("express");
const app = express();
const {
  getAllHotels,
  getHotelById,
  createHotel,
  deleteHotel,
} = require("./hotels");
const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  getBookingsByCustomerId,
  updateCustomerInfo,
  deleteCustomer,
} = require("./customers");

app.use(express.json());

app.get("/hotels", getAllHotels);
app.get("/hotels/:hotelId", getHotelById);
app.get("/customers", getAllCustomers);
app.get("/customers/:customerId", getCustomerById);
app.post("/hotels", createHotel);
app.post("/customers", createCustomer);
app.get("/customers/:customerId/bookings", getBookingsByCustomerId);
app.patch("/customers/:customerId", updateCustomerInfo);
app.delete("/customers/:customerId", deleteCustomer);
app.delete("/hotels/:hotelId", deleteHotel);

const PORT = 3000;
app.listen(PORT, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
