drop schema if exists lift cascade;
create schema lift;

drop table if exists lift.passenger;
create table lift.passenger(
    id uuid primary key,
    name text,
    email text,
    document text
);


drop table if exists lift.driver;
create table lift.driver(
    id uuid primary key,
    name text,
    email text,
    document text,
    car_plate text
);

drop table if exists lift.segment;
create table lift.segment(
    id uuid primary key,
    ride_from float,
    ride_to float,
    ride_time time 
);


drop table if exists lift.ride;
create table lift.ride(
    id uuid primary key,
    passenger_id uuid,
    driver_id uuid,
    status text,
    segment_id uuid,
    request_date timestamp,
    accept_date timestamp
);