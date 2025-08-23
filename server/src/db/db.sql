CREATE DATABASE test;

CREATE TABLE users (
  google_id VARCHAR(255) UNIQUE NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  schedule JSON
);

CREATE TABLE groups (
  id SERIAL PRIMARY KEY, 
  title VARCHAR(255) NOT NULL,
  owner_id VARCHAR(255) NOT NULL REFERENCES users(google_id)
);

CREATE TABLE members (
  group_id SERIAL REFERENCES groups(id),
  member_id VARCHAR(255) REFERENCES users(google_id)
);





-- dummy data pt2 made by the one and only
INSERT INTO users (name, email, google_id, schedule) 
VALUES ('sophia', '123@gmail.com', '1', '{ "schedule": "lol" }');

INSERT INTO users (name, email, google_id, schedule) 
VALUES ('neil', '456@gmail.com', '2', '{ "schedule": "lol2" }');

INSERT INTO users (name, email, google_id, schedule) 
VALUES ('alex', 'alex@gmail.com', '3', '{ "schedule": "busy" }');

INSERT INTO users (name, email, google_id, schedule) 
VALUES ('mia', 'mia@gmail.com', '4', '{ "schedule": "free" }');

INSERT INTO users (name, email, google_id, schedule) 
VALUES ('james', 'james@gmail.com', '5', '{ "schedule": "meeting" }');

INSERT INTO users (name, email, google_id, schedule) 
VALUES ('lily', 'lily@gmail.com', '6', '{ "schedule": "travel" }');

INSERT INTO users (name, email, google_id, schedule) 
VALUES ('ryan', 'ryan@gmail.com', '7', '{ "schedule": "off" }');

INSERT INTO users (name, email, google_id, schedule) 
VALUES ('zoe', 'zoe@gmail.com', '8', '{ "schedule": "class" }');

-- Groups
INSERT INTO groups (title, owner_id) VALUES ('group1', '1');
INSERT INTO groups (title, owner_id) VALUES ('group2', '2');
INSERT INTO groups (title, owner_id) VALUES ('group3', '3');

-- Members
INSERT INTO members (group_id, member_id) VALUES (1, '1');
INSERT INTO members (group_id, member_id) VALUES (1, '2');
INSERT INTO members (group_id, member_id) VALUES (1, '3'); 
INSERT INTO members (group_id, member_id) VALUES (2, '4');
INSERT INTO members (group_id, member_id) VALUES (2, '5');
INSERT INTO members (group_id, member_id) VALUES (2, '6');
INSERT INTO members (group_id, member_id) VALUES (3, '7');
INSERT INTO members (group_id, member_id) VALUES (3, '8');
INSERT INTO members (group_id, member_id) VALUES (3, '1');


