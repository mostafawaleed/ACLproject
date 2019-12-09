# EZsched

EZsched is a service for easy scheduling of courses by students and instructors.
To run EZsched:
`docker-compose up`

### Dependencies
* node v10+
* npm
* docker

### Config (using a config file)
Add a config file to the path /backend/keys/keys_dev.js.
Example config file format:
```
module.exports = {
  mongoURI:
    "YOUR MONGO URI"
};
```

### Config (using environment variables)
Instead of making a config file you can set these environment variables:
* **NODE_ENV**: Set to "production"
* **MONGO_URI**: Set to your Mongo URI

### Docker
To run the app using Docker:
* Frontend:
```
cd frontend
docker build -t ezsched-frontend .
docker run -p 3000:3000 -d ezsched-frontend
```
* Mongo backend:
```
cd backend
docker build -t ezsched-backend .
docker run -p 3001:3001 -d ezsched-backend
```
* Mockaroo backend:
```
cd mockaroo
docker build -t ezsched-mockaroo .
docker run -p 3002:3002 -d ezsched-mockaroo
```

### Docker Compose
To run the app using Docker Compose:
```
docker-compose up
```
