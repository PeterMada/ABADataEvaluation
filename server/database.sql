CREATE DATABASE ABADataEvaluation;

CREATE TYPE sex AS ENUM ('', 'man', 'woman');

-- // TODO add user roles
-- // TODO add temporaly password
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

CREATE TABLE therapeutists (
  therapeutist_id uuid DEFAULT uuid_generate_v4(),
  therapeutist_first_name VARCHAR(255) NOT NULL,
  therapeutist_last_name VARCHAR(255) NOT NULL,
  therapeutist_email VARCHAR(255) NOT NULL,
  supervisor_id uuid NOT NULL,
  PRIMARY KEY (therapeutist_id),

  CONSTRAINT fk_supervisor FOREIGN KEY(supervisor_id) REFERENCES users(user_id)
);

CREATE TABLE children(
  child_id uuid DEFAULT uuid_generate_v4(),
  child_first_name VARCHAR(255) NOT NULL,
  child_last_name VARCHAR(255) NOT NULL,
  child_childCode VARCHAR(255),
  child_sex sex,
  child_date_of_birth DATE,
  child_diagnosis VARCHAR(255),
  child_info VARCHAR(500),
  supervisor_id uuid NOT NULL,
  
  PRIMARY KEY (child_id),
  CONSTRAINT fk_supervisor FOREIGN KEY(supervisor_id) REFERENCES users(user_id)
);

  
CREATE TABLE skills (
  skill_id uuid DEFAULT uuid_generate_v4(),
  skill_title VARCHAR(255) NOT NULL,
  child_id uuid NOT NULL,

  PRIMARY KEY (skill_id),
  CONSTRAINT fk_children FOREIGN KEY(child_id) REFERENCES children(child_id) 
);

  
CREATE TABLE programs (
  program_id uuid DEFAULT uuid_generate_v4(),
  program_title VARCHAR(255) NOT NULL,
  skill_id uuid NOT NULL,

  PRIMARY KEY (program_id),
  CONSTRAINT fk_children FOREIGN KEY(skill_id) REFERENCES skills(skill_id)
);

CREATE TABLE targets (
  target_id uuid DEFAULT uuid_generate_v4(),
  target_title VARCHAR(255) NOT NULL,
  program_id uuid NOT NULL,

  PRIMARY KEY (target_id),
  CONSTRAINT fk_children FOREIGN KEY(program_id) REFERENCES programs(program_id)
);