CREATE DATABASE ABADataEvaluation;

CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL
);

-- insert fake users

INSERT INTO users(user_name, user_email, user_password)
 VALUES ('peter', 'test123@gmail.com', 'wert1189');