# URL Shortener Backend API

A backend URL shortener built with Node.js, Express, MongoDB Atlas and Mongoose.

## Features
- Generate short URLs
- Redirect users
- Track click history
- Analytics API

## Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## API Endpoints

POST /url
Generate short URL

GET /:shortId
Redirect to original URL

GET /url/analytics/:shortId
Get analytics data

## Run Locally

npm install
npm start