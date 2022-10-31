# It's up!

Simple server to check if endpoints are up and running.

## Setup

### Install dependencies

Install the node dependencies:

```sh
npm install
```

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

To start it in development mode please run:

```sh
npm run dev
```

To start it a production node process:

```sh
npm start
```

## Resources

- [Build a REST API with Node.js, Express, and MySQL](https://blog.logrocket.com/build-rest-api-node-express-mysql/)