drop table if exists ride.passenger;
drop schema if exists ride;
create schema if not exists ride;

create table ride.passenger(
    id uuid primary key,
    name text,
    email text,
    document text
);


drop table if exists ride.driver;
drop schema if exists ride;
create schema if not exists ride;

create table ride.driver(
    id uuid primary key,
    name text,
    email text,
    document text,
    car_plate text
);