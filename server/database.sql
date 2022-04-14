CREATE DATABASE ABADataEvaluation;

CREATE TYPE sex AS ENUM ('', 'man', 'woman');
CREATE TYPE target_type AS ENUM ('yes/no', 'prompt level', 'duration', 'frequency', 'frequency/time', 'text');
CREATE TYPE measuremend_type AS ENUM ('normal', 'baseline');

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
  program_description TEXT,
  program_baseline_from SMALLINT,
  program_baseline_to SMALLINT,
  program_baseline_result SMALLINT,
  program_baseline_done BOOLEAN DEFAULT FALSE,
  target_baseline_from SMALLINT,
  target_baseline_to SMALLINT,
  target_criterion_from SMALLINT,
  target_criterion_to SMALLINT,
  target_type target_type,
  program_created timestamptz not null,
  program_created_by uuid NOT NULL,
  skill_id uuid NOT NULL,

  PRIMARY KEY (program_id),
  CONSTRAINT fk_skill FOREIGN KEY(skill_id) REFERENCES skills(skill_id)
);

CREATE TABLE targets (
  target_id uuid DEFAULT uuid_generate_v4(),
  target_title VARCHAR(255) NOT NULL,
  target_description TEXT,
  target_baseline_current SMALLINT,
  target_baseline_complete BOOLEAN DEFAULT FALSE,
  target_complete BOOLEAN DEFAULT FALSE,
  target_created timestamptz not null default CURRENT_TIMESTAMP,
  target_baseline_completed_time timestamptz,
  program_id uuid NOT NULL,
  child_id uuid NOT NULL,

  PRIMARY KEY (target_id),
  CONSTRAINT fk_program FOREIGN KEY(program_id) REFERENCES programs(program_id),
  CONSTRAINT fk_children FOREIGN KEY(child_id) REFERENCES children(child_id) 
);

CREATE TABLE measurements (
  measurement_id uuid DEFAULT uuid_generate_v4(),
  measurement_created timestamptz not null default CURRENT_TIMESTAMP,
  measuremend_by uuid NOT NULL,
  measurement_closed BOOLEAN DEFAULT FALSE,
  measuremend_type measuremend_type,
  target_id uuid NOT NULL,

  PRIMARY KEY (measurement_id),
  CONSTRAINT fk_target FOREIGN KEY(target_id) REFERENCES targets(target_id)
);

CREATE TABLE measurementPolarQuestions (
  question_id uuid DEFAULT uuid_generate_v4(),
  question_result BOOLEAN,
  measurement_id uuid NOT NULL,

  PRIMARY KEY (question_id),
  CONSTRAINT fk_target FOREIGN KEY(measurement_id) REFERENCES measurements(measurement_id)
);






CREATE TABLE frequency (
  measurement_id uuid DEFAULT uuid_generate_v4(),
  measurement_created timestamp not null default CURRENT_TIMESTAMP,
  measurement_frequency SMALLINT NOT NULL,
  measuremend_by uuid NOT NULL,
  measurement_closed BOOLEAN DEFAULT FALSE,
  target_id uuid NOT NULL,

  PRIMARY KEY (measurement_id),
  CONSTRAINT fk_target FOREIGN KEY(target_id) REFERENCES targets(target_id),
  CONSTRAINT fk_user FOREIGN KEY(measuremend_by) REFERENCES users(user_id)
);

CREATE TABLE measurementProgramLevelOptions (
  measurement_id uuid DEFAULT uuid_generate_v4(),
  measurement_created timestamp not null default CURRENT_TIMESTAMP,
  measurement_frequency SMALLINT,
  target_id uuid NOT NULL,

  PRIMARY KEY (measurement_id),
  CONSTRAINT fk_target FOREIGN KEY(target_id) REFERENCES targets(target_id)
);

CREATE TABLE programLevelOptions (
  program_id uuid DEFAULT uuid_generate_v4(),
  target_title VARCHAR(255) NOT NULL,
  measurement_id uuid NOT NULL,
 
  PRIMARY KEY (program_id),
  CONSTRAINT fk_measurment FOREIGN KEY(measurement_id) REFERENCES measurementProgramLevelOptions(measurement_id)

);

