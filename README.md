# It's up!

Simple server to check if endpoints are up and running.

## Requirements

- Node.js 16+
- Docker

## Setup

### Install dependencies

Install the node dependencies:

```sh
npm install
```

### Create .env

Create a `.env` file, you can simply copy the `.env.sample` one, and default values will work with the configuration set in docker-compose.yml, but if you need to use a separate MariaDB instance, you will need to change that accordingly.

### Create configuration

Set the list of endpoints to check by creating a `jobs.json`, and creating an `jobs` array, and each record should have the following object:

```json
{
  "url": "https://microsoft.com/",
  "method": "HEAD",
  "cron": "*/1 * * * * *",
  "key": "microsoft-homepage"
}
```

The properties are the following:

- `url` The http request to test
- `method` The http method for the request
- `cron` A cronjob string, more info can be found [here](https://crontab.guru/)
- `key` A urlencoded string to use as a Key to identify the request

A full sample can be seen here:

```json
{
  "jobs": [
    {
      "url": "https://microsoft.com/",
      "method": "HEAD",
      "cron": "*/1 * * * * *",
      "key": "microsoft-homepage"
    },
    {
      "url": "https://google.com/",
      "method": "GET",
      "cron": "*/5 * * * * *",
      "key": "google-homepage"
    }
  ]
}
```

## Run

### Run MariaDB with Docker

Run MariaDB with Docker by running:

```sh
docker-compose up -d
```

### Create the database

To create the necessary tables, please run the migrations script:

```sh
npm run create:db
```

### Run the server

To start it in development mode please run:

```sh
npm run dev
```

To start it a production node process:

```sh
npm start
```

## Endpoints

### Get list of jobs with latest status

`GET /jobs/status` - Get the list of all the jobs with the most recent status

### Get list of all jobs

`GET /jobs/list` - Get the list of all the records for all jobs

**Params:**

- `limit` - Set the limit of records, defaults to 100
- `offset` - Set the offset of records, defaults to 0

### Create a new job

`POST /jobs` - Create a new job in the database and add the related cronjob to the queue

**Params:**

- `name` - Name, or Key, to use to identify the job
- `cron` - A cronjob string that can be generated [here](https://crontab.guru/).
- `method` - The http method to use for the request
- `url` - The url to test

Example:

```jsonc
// POST /jobs
{
    "name": "dev-to",
    "cron": "*/5 * * * * *",
    "method": "GET",
    "url": "https://dev.to"
}
```

### Update an existing job

`PATCH /jobs/:id` - Update an existing job in the database and updates the related cronjob to the queue

**Params:**

- `id` - The ID of the job
- `name` - Name, or Key, to use to identify the job
- `cron` - A cronjob string that can be generated [here](https://crontab.guru/).
- `method` - The http method to use for the request
- `url` - The url to test

Example:

```jsonc
// PATCH /jobs/1
{
    "name": "dev-to",
    "cron": "*/5 * * * * *",
    "method": "GET",
    "url": "https://dev.to"
}
```

## Resources

- [Build a REST API with Node.js, Express, and MySQL](https://blog.logrocket.com/build-rest-api-node-express-mysql/)