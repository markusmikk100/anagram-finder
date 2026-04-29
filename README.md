# anagram-finder
Anagram finder is a web application to find anagrams from a given word. <br>
Language support (i18n): English and Estonian.
<br><br>
## Requirements
You need to have:
- PHP and Composer
- Node.js
- Docker
<br><br>
## Running the application
### Docker
- Clone the repo
  ```bash
  git clone https://github.com/markusmikk100/anagram-finder.git
  ```
- Open the working directory
  ```bash
  docker compose up
  ```
- This will start:
- Frontend at http://localhost:3000
- Backend at http://localhost:8000
- MySQL database at localhost:3307
<br><br>
### Running Locally (without Docker)
#### Backend

- Navigate to backend
  ```bash
  cd backend
  ```
- Install dependencies
  ```bash
  composer install
  ```
- Copy the top part of .env.example and make
  .env and copy the bottom part and make .env.docker
- Generate application key
  ```bash
  php artisan key:generate
  ```
- Copy the key to .env.docker
- Run migrations
  ```bash
  php artisan migrate
  ```
- Generate Swagger documentation
  ```bash
  php artisan l5-swagger:generate
  ```
- Start the server
  ```bash
  php artisan serve
  ```
- Backend runs at http://127.0.0.1:8000
- You still need to run dockers db for it to work
<br><br>
#### Frontend
- Navigate to frontend
  ```bash
  cd frontend
  ```
- Install dependencies
  ```bash
  npm install
  ```
- Copy from .env.example to .env
- Start the server
  ```bash
  npm run dev
  ```
- Frontend runs at http://localhost:5173
<br><br>
## API Documentation
Swagger UI is available at:

- http://127.0.0.1:8000/api/documentation (Local)
- https://anagram-finder-backend-production.up.railway.app/api/documentation (Railway)
  (PS: Change server, else it will try to run local.)
<br><br>
## Testing
Run the unit tests from the backend directory:
```bash
php artisan test
```
It tests the algorithm that sorts words before storing them.
<br><br>
## Endpoints
- GET | /api/wordbase/find/{word}
- POST | /api/wordbase/import

Import request body:
```bash
{
  "url": "https://www.opus.ee/lemmad2013.txt"
}
``` 
<br>

## Railway
Application is also deployed on Railway and will close on May 19 2026.
- Frontend: https://anagram-finder-frontend-production.up.railway.app
- Backend: https://anagram-finder-backend-production.up.railway.app
