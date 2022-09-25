CREATE TABLE Rooms (id serial PRIMARY KEY, Name text NOT NULL, created_at timestamptz, location text);
CREATE TABLE Issues (id serial PRIMARY KEY, issue text NOT NULL, created_at timestamptz);
CREATE TABLE PersonalCalendar (id serial PRIMARY KEY, userid text NOT NULL, created_at timestamptz, calendar text);
CREATE TABLE courses (id serial PRIMARY KEY, name text NOT NULL, created_at timestamptz, code text, URL text);
CREATE TABLE calendars (id serial PRIMARY KEY, name text NOT NULL, created_at timestamptz, code text, URL text, parent_course integer, foreign key (parent_course) references courses(id));
CREATE TABLE events (id serial PRIMARY KEY, name text NOT NULL, created_at timestamptz, start_time timestamptz, end_time timestamptz, location text, last_update  timestamptz, "group" text, room text ,teacher text, aid text ,last_cache timestamptz, parent_calendar integer, foreign key (parent_calendar) references calendars(id));
