## Create a Course Selling App


- Initialize a Node js Project
- Add express , jsonwebtoken to it as dependency
- create Index js
- add route skeleton for user login user signup purchase a course see course
- add route skeleton for admin login admin signup add a course delete a course add course content
- add middlewares for users and admin auth
- add a database (mongodb) use dotenv to store the database connection string
- define schema for  user admin course purchase
- complete routes for user login signup purchase a course see course 
- create front end


## Environment variables

Copy `.env.example` to `.env` and fill values before running the app. `.env` is ignored by git.

Required variables
- `MONGO_URI` - MongoDB connection string. Example (Atlas): `mongodb+srv://<user>:<password>@cluster0.mongodb.net/courseselling?retryWrites=true&w=majority` or local: `mongodb://localhost:27017/courseselling`
- `JWT_ADMIN_PASSWORD` - secret used to sign admin JWTs
- `JWT_USER_PASSWORD` - secret used to sign user JWTs
- `PORT` - optional server port (defaults to `3000`)

Quick start

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file from the example and edit the values:

```bash
copy .env.example .env   # on Windows (PowerShell/CMD)
# or
cp .env.example .env    # on macOS/Linux
```

3. Run the server in dev mode:

```bash
npm run dev
```

Connecting to MongoDB Atlas (brief)

1. Create a free cluster at https://cloud.mongodb.com
2. Create a database user and note the password
3. Add your IP to the network access whitelist (or allow access from anywhere for quick testing)
4. Get the connection string from "Connect" → "Connect your application" and paste it into `MONGO_URI`, replacing `<password>` and `<dbname>`

Local MongoDB

1. Install MongoDB Community Server and start the service
2. Use `MONGO_URI=mongodb://localhost:27017/courseselling` in your `.env`


