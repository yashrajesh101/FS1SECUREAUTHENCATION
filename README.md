# FS1SECUREAUTHENCATION
Full stack web development project 1

This project provides a secure authentication system built using Node.js, Express, MongoDB, and React.js. It includes features like user registration, login, JWT authentication, and password hashing for enhanced security.

Features

User Registration and Login

Secure Password Hashing with bcrypt

JWT-based Authentication

Middleware for Route Protection

MongoDB Database Integration

Validation using Joi

CORS and Body Parser Support

Getting Started

Prerequisites

Ensure you have the following installed:

Node.js (v14+)

MongoDB

npm or yarn

Installation

Clone the repository:

git clone https://github.com/your-repo/secure-authentication-system.git
cd secure-authentication-system

Install dependencies:

npm install

Create a .env file and add the following environment variables:

PORT=8080
MONGO_CONN=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the backend server:

npm start

Navigate to the frontend directory and start the React application:

cd client
npm start

API Endpoints

Authentication Routes

POST /auth/signup - Register a new user

POST /auth/login - Login with email and password

GET /products - Access protected route (requires authentication)

Technologies Used

Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Joi

Frontend: React.js, Bootstrap, Axios

Contributing

Feel free to contribute by submitting issues or pull requests.

License

This project is open-source and available under the MIT License.


