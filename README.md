## Install Dependencies

# For Frontend:
- cd frontend
- npm i

# For Backend:
- cd backend
- npm i

## Environment Variables

Create a .env file in backend folder and add the following environment variables:
- MONGO_URL=<YOUR_MONGODB_URL>
- PORT=<YOUR_PORT>
- JWT_SECRET=<ANY_RANDOM_KEY>
- JWT_EXPIRE=5d
- COOKIE_EXPIRE=5

## Starting the frontend and backend

# For Frontend:
- cd frontend
- npm start

# For Backend
- cd backend
- node index.js