CREATE DATABASE ABADataEvaluation;

CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  user_first_name VARCHAR(255) NOT NULL,
  user_last_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  user_title_before VARCHAR(255),
  user_title_after VARCHAR(255),
  user_email_verified BOOLEAN,
  user_password_created BOOLEAN,
  user_date_created DATE,
  user_last_login DATE
);

-- insert fake users
INSERT INTO users(user_first_name, user_last_name, user_email, user_password)
 VALUES ('peter', 'mada' 'test123@gmail.com', 'wert1189');
