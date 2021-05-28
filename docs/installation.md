# Installation

In development:
- webpack-dev-server listens on the port 3000
  - it serves your frontend app's bundle.js
  - it manages hot reloading
- the backend is launched with docker-compose

## Build the docker images

To build the application, launch:
```bash
docker-compose build
```

## Start the app

What you need to do to start the project:

- Start the frontend:
  ```bash
  cd frontend
  yarn install
  yarn start
  ```

The frontend should now be running at [localhost:3000](http://localhost:3000).

- Start the backend:
  ```bash
  docker-compose up -d
  ```

The frontend should now successfully make calls to the API.

## Load fixtures

- Connect to the PHP container
  ```bash
  docker-compose exec php /bin/sh
  ```
- Load the fixtures
  ```bash
  bin/console h:f:l -n
  ```
  - h:f:l is a shortcut for `hautelook:fixtures:load`
  - `-n` disables interactive mode, so that the console does not ask for confirmation
  - ⚠️ This will reset the database, all achievements will be erased

You can now login using an account described in `backend/fixtures/users.yaml`.
The passwords are specified between parentheses at the end of the lines with the encrypted passwords.
