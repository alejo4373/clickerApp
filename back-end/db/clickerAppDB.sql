DROP DATABASE IF EXISTS clicker-db

CREATE DATABASE clicker-db

\c clicker-db

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR,
  password_digest VARCHAR,
  points INTEGER,
  powerups VARCHAR
);



INSERT INTO users (username, password_digest, points, powerups)
  VALUES ('Tyler', 'password', 0, 'none'), ('Shannon', 'password1', 0, 'none'), ('Richard', 'password2', 0, 'none');