# Coffee Vending Machine

This is a simple coffee vending machine simulation.

## Features

- Dispense various types of coffee.
- Handle payments.
- Track inventory.

## Setup

To run this project, you need Node.js installed.

1. Clone the repository:
   ```bash
   git clone https://github.com/germangp088/coffee-vending-machine.git
   cd coffee-vending-machine
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

## Usage

Follow the prompts in the console to interact with the coffee machine.

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

## Contributing

Feel free to open issues or pull requests.
