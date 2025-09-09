CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  oidc_sub TEXT UNIQUE NOT NULL,
  profile_picture_url TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);

CREATE TABLE schedules (
  user_id INT REFERENCES users(id) UNIQUE NOT NULL,
  schedule JSONB NOT NULL
);

CREATE TABLE groups (
  id SERIAL PRIMARY KEY, 
  title TEXT NOT NULL,
  owner_id INT NOT NULL REFERENCES users(id)
);

CREATE TABLE members (
  group_id INT REFERENCES groups(id),
  member_id INT REFERENCES users(id)
);

ALTER TABLE members ADD CONSTRAINT unique_rows UNIQUE (group_id, member_id);

CREATE TABLE invites (
  uuid TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id INT REFERENCES groups(id),
  expiration TIMESTAMP,
  invited_by INT REFERENCES users(id)
);

-- session store
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

