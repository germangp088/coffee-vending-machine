# coffee-vending-machine

It's a coffe vending machine! serve yourself your favourite coffe combination!

### Installation

```sh
$ npm install
```

### Run

```sh
$ npm run build
$ npm run start
```

## Run on Docker
You can run the project with Docker to avoid installing Node or npm packages on your machine.

### Prerequisites

- Docker
- Docker Compose

### Start the app

Build the image and start the app from a fresh checkout:

```sh
docker-compose build
docker-compose run --rm --service-ports coffee-vending-machine sh -c "npm run build && npm run start"
```

The React app will be available at http://localhost:3000 and the API will be available at http://localhost:8080.

Press `Ctrl+C` to stop the app.

### Clean up

Remove stopped containers created by Docker Compose:

```sh
docker-compose down
```
