
# Medico Server

Backend server for the Medico application.

## Setup

1. Install dependencies:
```
npm install
```

2. Create a `.env` file with the following variables:
```
MONGODB_URI=mongodb+srv://anil:1234@cluster-med.scah9ik.mongodb.net/medico
JWT_SECRET=medico-secret-key
PORT=5000
```

3. Start the server:
```
npm start
```

Or in development mode:
```
npm run dev
```

## API Endpoints

### Authentication

- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`
- **Get Current User**: `GET /api/auth/user`
