# Rhea
This is a project thats goal is to create a platform for actually use [KronoX](https://kronox.se/) Schedule. The goal is also to extend the functionality. This includes:
- Subscribing to a Schedule
- Creating a personal Schedule 
- Maps of campuses
- Platfrom for student unions to create events
- Support more then MDU

## Development environment
### Information
This project is using the following frameworks/technologies:
- Next.js
- React.js
- TypeScript
- Tailwind CSS
- Supabase
- Mapbox

### Setup
#### Prerequisites

##### For frontend
- Node (tested on 16.15.1)
- Yarn/NPM

##### For backend (This will hopefully be removed soon)
- Python (tested on 3.10)

#### Supabase
This project is using [Supabase](https://supabase.com/) for it's users and database. This is a platform that is a open source alternative to Google Firebase.

##### Project Setup
Firstly create a project, this can be a free project named anything.
After that you need to initialize the database, this is done using the SQL queries located [here](https://github.com/axdra/Rhea/blob/next/backend/DB.sql). This is done by going to: "SQL Editor" tab in supabase in the project. 

When this is done you should have some empty tables created. 

Now it's time to populate the db. This is right now done by running two scripts located in backend. The first script to run is [this](https://github.com/axdra/Rhea/blob/next/backend/calendar/courses_scraper.py). This script is kinda "complicated" to run. You need to have a selenium webdriver for this. It's documented how to run it in the file, you need to have --supabase-url and --supabase-secret-key cli options when running. 

Then you need to run the other init script found [here](https://github.com/axdra/Rhea/blob/next/backend/calendar/courses_scraper.py). This is ran in the same way. 

If you want the rooms to work correctly you will need to run the rooms extractor script found in backend/map too.

#### Frontend development
If you don't want to do all this bootstrap work to get a dev enviroment up, you can just contact me and i can give you access to my dev enviroment.

For this to work correctly you will need to create a .env.local file in the "frontend" root directory. This file needs to include:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_MAPBOX_TOKEN=
SUPABASE_SECRET_KEY=
```
#### User Auth
If you want to have the functionality of user auth you will need to configure that in the Supabase console. 


