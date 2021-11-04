exercise 1

```sql
alter table customers add column date_of_birth date;
alter table customers rename column date_of_birth to birthdate;
alter table customers drop column birthdate;
```

exercise 2

```sql
create table test ();
drop table test;
```

exercise 3

```sql
update hotels set postcode='L10XYZ' where name ='Elder Lake Hotel';
update hotels set rooms=25 where name='Cozy Hotel';
update customers set address='2 Blue Street', city='Glasgow', postcode='G11ABC' where name='Nadia Sethuraman';
update bookings set nights=5 where customer_id=1 and hotel_id=1;
```

exercise 4

```sql
delete from bookings where customer_id=8 and checkin_date='2020-01-03';
delete from bookings where customer_id=6;
delete from customers where id=6;
```

exercise 5

```sql
--Retrieve all the bookings along with customer data for bookings starting in 2020
select b.*, c.* from bookings b
inner join customers c on b.customer_id = c.id
where b.checkin_date > '2020-01-01';

--Retrieve the customer names, booking start dates and number of nights for all customers who booked the hotel name Jade Peaks Hotel
select c.name, b.checkin_date, b.nights from customers c
inner join bookings b on b.customer_id = c.id
inner join hotels h on b.hotel_id = h.id

--Retrieve all the booking start dates with customer names and hotel names for all bookings for more than 5 nights
select b.checkin_date, b.nights, c.name as customer_name, h.name as hotel_name from bookings b
inner join customers c on b.customer_id = c.id
inner join hotels h on b.hotel_id = h.id
where b.nights >= 5;
where h.name = 'Jade Peaks Hotel';
```

--exercise 6

```sql
--Retrieve all customers whose name starts with the letter S
select * from customers where name like 'S%';

--Retrieve all hotels which have the word Hotel in their name
select * from hotels where name like '%Hotel%';

--Retrieve the booking start date, customer name, hotel name for the top 5 bookings ordered by number of nights in descending order
select b.checkin_date, b.nights, c.name, h.name from bookings b
inner join customers c on b.customer_id = c.id
inner join hotels h on b.hotel_id = h.id
order by b.nights desc
limit 5;
```
