DROP DATABASE IF EXISTS clicker_app_db;

CREATE DATABASE clicker_app_db;

\c clicker_app_db;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE,
  password_digest VARCHAR,
  points INTEGER,
  powerups VARCHAR
);



INSERT INTO users (username, password_digest, points, powerups)
  VALUES ('Tyler', 'password', 0, 'none'), ('Shannon', 'password1', 0, 'none'), ('Richard', 'password2', 0, 'none');
