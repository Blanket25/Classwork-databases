##Exercise 1
####Create the customers table in the cyf_hotels database.

```sql
CREATE TABLE customers (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(30) NOT NULL,
  email     VARCHAR(120) NOT NULL,
  address   VARCHAR(120),
  city      VARCHAR(30),
  postcode  VARCHAR(12),
  country   VARCHAR(20)
);

```

####Use DBeaverCreate a new table hotels in the cyf_hotels database with the following columns: an id, a name, the number of rooms and the hotel postcode.

```sql
CREATE TABLE hotels (
  id       SERIAL PRIMARY KEY,
  name     VARCHAR(120) NOT NULL,
  rooms    INT NOT NULL,
  postcode VARCHAR(10)
);

```

##Exercise 2
####Create the table bookings in your cyf_hotels database and verify that it is correctly created.

```sql
CREATE TABLE bookings (
  id               SERIAL PRIMARY KEY,
  customer_id      INT REFERENCES customers(id),
  hotel_id         INT REFERENCES hotels(id),
  checkin_date     DATE NOT NULL,
  nights           INT NOT NULL
);

```

##Exercise 3
####Run the 3 SQL statements above.

```sql
INSERT INTO customers (name, email, address, city, postcode, country) VALUES ('John Smith','j.smith@johnsmith.org','11 New Road','Liverpool','L10 2AB','UK');
INSERT INTO hotels (name, rooms, postcode) VALUES ('Triple Point Hotel', 10, 'CM194JS');
INSERT INTO bookings (customer_id, hotel_id, checkin_date, nights) VALUES (1, 1, '2019-10-01', 2);
```

####Insert yourself in the customers table.

```sql
INSERT INTO customers (name, email, address, city, postcode, country) VALUES ('Bianca Inga','bianca@mail.com','11 vila de gracia','Barcelona','08012','Spain');

```

####Insert the following 3 hotels in the hotels table:
-The Triple Point Hotel has 10 rooms, its postcode is CM194JSThe
-Royal Cosmos Hotel has 5 rooms, its postcode is TR209AXThe
-Pacific Petal Motel has 15 rooms, its postcode is BN180TG

```sql

INSERT INTO hotels (name, rooms, postcode) VALUES ('Royal Cosmos Hotel', 5, 'TR209AXThe');
INSERT INTO hotels (name, rooms, postcode) VALUES ('Pacific Petal', 15, 'BN180TG');

```

####Try to insert a booking for a customer id which does not exist in the customers table (for example ID 100). What is happening and why?

```sql

INSERT INTO bookings (customer_id, hotel_id, checkin_date, nights) VALUES (100, 1, '2019-10-01', 2);

```

It can't be done cause the customer with id 100 doesn`t exist.

##Exercise 4
####Use the above SQL statement to display all the data inserted in the customers table.

```sql
SELECT * FROM customers;

```

Use the above SQL statement to display all the data inserted in the hotels table.

```sql
SELECT * FROM hotels;

```

Use the above SQL statement to display all the data inserted in the bookings table.

```sql
SELECT * FROM bookings;

```

##Exercise 5
####Retrieve all information for the customer Laurence Lebihan.

```sql
select * from customers where name = 'Laurence Lebihan'

```

####Retrieve all customers name living in UK.

```sql
select name from customers where country = 'UK'

```

####Retrieve the address, city and postcode of Melinda Marsh.

```sql
select address, city, postcode from customers where name = 'Melinda Marsh'

```

####Retrieve all hotels located in the postcode DGQ127.

```sql
select * from hotels where postcode = 'DGQ127'

```

####Retrieve all hotels with more than 11 rooms.

```sql
select * from hotels where rooms > 11

```

####Retrieve all hotels with more than 6 rooms but less than 15 rooms.

```sql
select * from hotels where rooms > 6 and rooms < 15

```

####Retrieve all hotels with exactly 10 rooms or 20 rooms.

```sql
select * from hotels where rooms = 10 or rooms = 20

```

####Retrieve all bookings for customer id 1.

```sql
select * from bookings where customer_id = 1

```

####Retrieve all bookings for more than 4 nights.

```sql
select * from bookings where nights > 4

```

####Retrieve all bookings starting in 2020.

```sql
select * from bookings where checkin_date > '2020-01-01'

```

####Retrieve all bookings before 2020 for less than 4 nights.

```sql
select * from bookings where checkin_date < '2020-01-01' and nights < 4

```
