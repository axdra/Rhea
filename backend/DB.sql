CREATE TABLE rooms (id serial PRIMARY KEY, org text NOT NULL, Name text NOT NULL, created_at timestamptz, location text);
CREATE TABLE issues (id serial PRIMARY KEY, org text NOT NULL, issue text NOT NULL, created_at timestamptz);
CREATE TABLE courses (id serial PRIMARY KEY, org text NOT NULL, name text NOT NULL, created_at timestamptz, code text, url text);
CREATE TABLE calendars (id serial PRIMARY KEY, org text NOT NULL, name text NOT NULL, created_at timestamptz, code text, url text, parent_course integer, foreign key (parent_course) references courses(id));
CREATE TABLE events (id serial PRIMARY KEY, org text NOT NULL, name text NOT NULL, created_at timestamptz, start_time timestamptz, end_time timestamptz, location text, last_update  timestamptz, "group" text, room text ,teacher text, aid text ,last_cache timestamptz, parent_calendar integer, foreign key (parent_calendar) references calendars(id));
CREATE TABLE personalcalendar (id serial PRIMARY KEY, userid text NOT NULL, created_at timestamptz, calendar text NOT NULL, org text NOT NULL);
CREATE TABLE organizations (id serial PRIMARY KEY, name text NOT NULL, url text NOT NULL);