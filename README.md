# forecast-watch-service

a service that watches the forecast and notifies when conditions enable surfing.

## Dependencies 
- install dependencies by running `npm install`.
- make sure to provide a `.env` file like in the `.env_example` with the relevant environment vars.
- using [https://stormglass.io](https://stormglass.io) api key for weather information.

## Running the app
### locally
- run as 'dev' `npm run dev`
- run as 'prod' `npm run build` and then `npm run start`.

### dockerized
- run `docker compose up`

## Tests
- run `docker compose up` to enable end to end tetsing
- run `npm run test`

## APIs
- GET `/is_alive`