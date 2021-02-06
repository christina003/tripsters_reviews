DROP DATABASE IF EXISTS reviews_service;

CREATE DATABASE reviews_service;

\c reviews_service

/*create properties table*/
CREATE TABLE IF NOT EXISTS properties(
   property_id SERIAL PRIMARY KEY,
   overall_rating_avg decimal NOT NULL,
   communication_rating decimal NOT NULL,
   cleanliness_rating decimal NOT NULL,
   check_in_rating decimal NOT NULL,
   accuracy_rating decimal NOT NULL,
   location_rating decimal NOT NULL,
   value_rating decimal NOT NULL
);


/*create reviews table*/
CREATE TABLE IF NOT EXISTS reviews(
   review_id SERIAL PRIMARY KEY,
   fk_id integer,
   body varchar NOT NULL,
   entry_date varchar NOT NULL,
   category varchar NOT NULL,
   userName varchar NOT NULL,
   userPicture varchar NOT NULL,
   CONSTRAINT fk_property_id
      FOREIGN KEY(fk_id)
         REFERENCES properties(property_id)
);

/*CREATES index for the foreign key in reviews table*/
CREATE INDEX reviews_fk_id_index
ON reviews ("fk_id" desc);

/*COPY the properties CSV to the database*/
COPY properties (overall_rating_avg, communication_rating, cleanliness_rating, check_in_rating, accuracy_rating, location_rating, value_rating) 
FROM '/Users/christinasantos/SDC/AirBnb-Reviews-Service/database/CSV/properties.csv' DELIMITER ',' CSV HEADER;

/*COPY the reviews CSV to the database*/
COPY reviews (fk_id, body, entry_date, category, userName, userPicture) 
FROM '/Users/christinasantos/SDC/AirBnb-Reviews-Service/database/CSV/reviews1.csv' DELIMITER ',' CSV HEADER;

COPY reviews (fk_id, body, entry_date, category, userName, userPicture) 
FROM '/Users/christinasantos/SDC/AirBnb-Reviews-Service/database/CSV/reviews2.csv' DELIMITER ',' CSV HEADER;

COPY reviews (fk_id, body, entry_date, category, userName, userPicture) 
FROM '/Users/christinasantos/SDC/AirBnb-Reviews-Service/database/CSV/reviews3.csv' DELIMITER ',' CSV HEADER;

COPY reviews (fk_id, body, entry_date, category, userName, userPicture) 
FROM '/Users/christinasantos/SDC/AirBnb-Reviews-Service/database/CSV/reviews4.csv' DELIMITER ',' CSV HEADER;

COPY reviews (fk_id, body, entry_date, category, userName, userPicture) 
FROM '/Users/christinasantos/SDC/AirBnb-Reviews-Service/database/CSV/reviews5.csv' DELIMITER ',' CSV HEADER;

COPY reviews (fk_id, body, entry_date, category, userName, userPicture) 
FROM '/Users/christinasantos/SDC/AirBnb-Reviews-Service/database/CSV/reviews6.csv' DELIMITER ',' CSV HEADER;