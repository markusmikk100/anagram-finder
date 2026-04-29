# anagram-finder

Anagram finder is a web application to find anagrams from a given word.
Language support (i18n): English and Estonian

## Requirements

You need to have:

- PHP and Composer
- Node.js
- Docker

## Running the application

### Docker

- Clone the repo
  `git clone https://github.com/markusmikk100/anagram-finder.git`
- Open the working directory
  `docker compose up`
- This will start:
- Frontend at http://localhost:3000
- Backend at http://localhost:8000
- MySQL database at localhost:3307

### Running Locally (without Docker)

#### Backend

- Navigate to backend
  `cd backend`
- Install dependencies
  `composer install`
- Copy the top part of .env.example and make
  .env and copy the bottom part and make .env.docker
- Generate application key
  `php artisan key:generate`
- Copy the key to .env.docker
- Run migrations
  `php artisan migrate`
- Generate Swagger documentation
  `php artisan l5-swagger:generate`
- Start the server
  `php artisan serve`
- Backend runs at http://127.0.0.1:8000
- You still need to run dockers db for it to work

#### Frontend

- Navigate to frontend
  `cd frontend`
- Install dependencies
  `npm install`
- Copy from .env.example to .env
- Start the server
  `npm run dev`
- Frontend runs at http://localhost:5173

## API Documentation

Swagger UI is available at:

- http://127.0.0.1:8000/api/documentation (Local)
- https://anagram-finder-backend-production.up.railway.app/api/documentation (Railway)
  (PS: Change server, else it will try to run local)

## Endpoints

- GET | /api/wordbase/find/{word}
- POST | /api/wordbase/import

Import request body:
`{
  "url": "https://www.opus.ee/lemmad2013.txt"
}`

## Railway

Application is also deployed on Railway and will close on May 19 2026

- Frontend: https://anagram-finder-frontend-production.up.railway.app
- Backend: https://anagram-finder-backend-production.up.railway.app
