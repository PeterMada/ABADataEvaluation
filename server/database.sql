CREATE DATABASE ABADataEvaluation;

// TODO add user roles
// TODO add temporaly password
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
  user_last_login DATE,
  PRIMARY KEY (user_id)
);

-- insert fake users
INSERT INTO users(user_first_name, user_last_name, user_email, user_password)
 VALUES ('peter', 'mada' 'test123@gmail.com', 'wert1189');


CREATE TYPE sex AS ENUM ('', 'man', 'woman');

CREATE TABLE children(
  child_id uuid DEFAULT uuid_generate_v4(),
  child_first_name VARCHAR(255) NOT NULL,
  child_last_name VARCHAR(255) NOT NULL,
  child_childCode VARCHAR(255),
  child_sex sex,
  child_date_of_birth DATE,
  child_diagnosis VARCHAR(255),
  supervisor_id uuid NOT NULL,
  
  CONSTRAINT fk_supervisor FOREIGN KEY(supervisor_id) REFERENCES users(user_id)
  );