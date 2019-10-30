# REST API GeoInfo

This is a simple rest api with login and authentication allowing to fetch geographical information based on the ip provided and store it in the mongo db.

The entire application is splitted into two files `app.js` where the application initiation resides and `index.js` where the actual server is started up

### ADD THREE CONFIG FILES :<br />

![config](https://user-images.githubusercontent.com/15052640/67874962-00b24680-fb36-11e9-8eb3-434a1ad5265f.png)<br />
content of three files:

- **dev.env:**<br />
  `PORT=3000`<br />
  `MONGODB_URI=mongodb://127.0.0.1:27017/movie-rest`<br />
  `JWT_SECRET=thisisasecretformyapp`<br />
  `IPSTACK_API_KEY=25a737eb693513942ca9a3e90fcb5b67`<br />

- **test.env:**<br />
  `PORT=3000`<br />
  `MONGODB_URI=mongodb://127.0.0.1:27017/movie-rest-test`<br />
  `JWT_SECRET=thisisasecretformyapp`<br />
  `IPSTACK_API_KEY=25a737eb693513942ca9a3e90fcb5b67`<br />

- **dc.env:**<br />
  `PORT=3000`<br />
  `MONGODB_URI=mongodb://mongo:27017/movie-rest-test`<br />
  `OMDB_API_KEY=*x*x*x*x`<br />
  `IPSTACK_API_KEY=25a737eb693513942ca9a3e90fcb5b67`<br />

You can get the IPSTACK_API_KEY from here => https://ipstack.com/

## Install

    npm install

## Run the app

    npm run dev

## Run the tests

    npm run test

## Run with docker

    docker-compose up --build

## Build docker image

    docker build -t <TAG_NAME> .

## Run docker image

    docker run -p80:3000 <TAG_NAME>

# REST API

The REST API to the example app is described below.

## Create new user

### Request

`POST /users`

    curl --header "Content-Type: application/json" -d "{\"name\":\"adam\",\"email\":\"adam@email.com\",\"password\":\"password\",\"age\":\"22\"}" http://localhost:3000/users

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {
        "user": {
        "age": 2,
        "\_id": "5db95e2d24e8cf19011821d4",
        "name": "Test",
        "email": "test2332@test.pl",
        "createdAt": "2019-10-30T09:55:57.199Z",
        "updatedAt": "2019-10-30T09:55:57.218Z",
        "\_\_v": 1
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGI5NWUyZDI0ZThjZjE5MDExODIxZDQiLCJpYXQiOjE1NzI0MjkzNTd9.7qtlAfnSLMKHHAC1W2RnCyftzABdIiLEPine5uk6Tik"
    }

## Create a user with the same email address

### Request

`POST /users`

    curl --header "Content-Type: application/json" -d "{\"name\":\"adam\",\"email\":\"adam@email.com\",\"password\":\"password\",\"age\":\"22\"}" http://localhost:3000/users

### Response

    HTTP/1.1 400 Bad Request
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 400 Bad Request
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {
        "driver": true,
        "name": "MongoError",
        "index": 0,
        "code": 11000,
        "errmsg": "E11000 duplicate key error collection: geo-api.users index: email_1 dup key: { : \"adam@email.com\" }"
    }

## Login user

### Request

`POST /users/login`

    curl --header "Content-Type: application/json" -d "{\"email\":\"adam@email.com\",\"password\":\"password\"}" http://localhost:3000/users/login

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {
    "user": {
        "age": 23,
        "_id": "5db88e3bd04fae43fa505ed7",
        "name": "Test",
        "email": "test2e2@test.pl",
        "createdAt": "2019-10-29T19:08:43.552Z",
        "updatedAt": "2019-10-30T09:55:22.480Z",
        "__v": 2
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGI4OGUzYmQwNGZhZTQzZmE1MDVlZDciLCJpYXQiOjE1NzI0MjkzMjJ9.t1TDHSr77h-ihx9wlOeNRYqzmyjsLLrCROA2-zIJks4"

}

## Logout user

### Request

`POST /users/logout`

    curl --header "Content-Type: application/json" -d "{\"email\":\"adam@email.com\",\"password\":\"password\"}" http://localhost:3000/users/logout

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {"message": "User Test successfully logged out!"}

## Create a new geo info entry

### Request

`POST /thing/`

    curl --header "Content-Type: application/json" -d "{"ip\":\"172.32.23.211\"}" http://localhost:3000/geoinfos`

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36

    {
    "_id": "5db88eead04fae43fa505edb",
    "ip": "172.32.23.211",
    "type": "ipv4",
    "continent_code": "NA",
    "continent_name": "North America",
    "country_name": "United States",
    "region_code": "IL",
    "region_name": "Illinois",
    "city": "Chicago",
    "zip": "60608",
    "latitude": 41.84885025024414,
    "longitude": -87.67124938964844,
    "location": {
        "geoname_id": 4887398,
        "capital": "Washington D.C.",
        "languages": [
            {
                "_id": "5db88eead04fae43fa505edc",
                "code": "en",
                "name": "English",
                "native": "English"
            }
        ],
        "country_flag": "http://assets.ipstack.com/flags/us.svg",
        "country_flag_emoji": "🇺🇸",
        "country_flag_emoji_unicode": "U+1F1FA U+1F1F8",
        "calling_code": "1",
        "is_eu": false
    },
    "user": "5db7fb66c39cda58d988a21f",
    "createdAt": "2019-10-29T19:11:38.054Z",
    "updatedAt": "2019-10-29T19:11:38.054Z",
    "__v": 0

}

## Get all geo info entries for a certain user

### Request

`GET /geoinfos`

     curl -H "Authorization: Bearer <AUTH_TOKEN>, Content-Type: application/json" curl --header "Content-Type: application/json" http://localhost:3000/geoinfos

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 36

    []

## Get a geo info entry by id

### Request

`GET /geoinfos/id`

    curl -i -H 'Accept: application/json, Authorization: Bearer <AUTH_TOKEN>' http://localhost:3000/geoinfos/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 35

    {
    "location": {
        "geoname_id": 4887398,
        "capital": "Washington D.C.",
        "languages": [
            {
                "_id": "5db961b61973cb2400ebf76f",
                "code": "en",
                "name": "English",
                "native": "English"
            }
        ],
        "country_flag": "http://assets.ipstack.com/flags/us.svg",
        "country_flag_emoji": "🇺🇸",
        "country_flag_emoji_unicode": "U+1F1FA U+1F1F8",
        "calling_code": "1",
        "is_eu": false
    },
    "_id": "5db961b61973cb2400ebf76e",
    "ip": "172.32.23.211",
    "type": "ipv4",
    "continent_code": "NA",
    "continent_name": "North America",
    "country_name": "United States",
    "region_code": "IL",
    "region_name": "Illinois",
    "city": "Chicago",
    "zip": "60608",
    "latitude": 41.84885025024414,
    "longitude": -87.67124938964844,
    "user": "5db88e13f194da4398c33786",
    "createdAt": "2019-10-30T10:11:02.422Z",
    "updatedAt": "2019-10-30T10:11:02.422Z",
    "__v": 0

}

## Get a non-existent geo info entry

### Request

`GET /geoinfos/id`

    curl -i -H 'Accept: application/json, Authorization: Bearer <AUTH_TOKEN>' http://localhost:3000/geoinfos/5db88eead04fae43fa505edb

### Response

    HTTP/1.1 404 Not Found
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 404 Not Found
    Connection: close
    Content-Type: application/json
    Content-Length: 35

    {"message": "Entry with id: 5db88eead04fae43fa505edb for user could not be found"}

## Change user information

### Request

`PATCH /users/me`

    curl -i -H 'Accept: application/json,  Authorization: Bearer <AUTH_TOKEN>' -X PATCH -d -d "{\"name\":\"Test\",\"email\":\"test22@test.pl\",\"password\":\"password\",\"age\":\"23\"}" http://localhost:3000/users/me

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 41

    {
    "age": 23,
    "_id": "5db88e13f194da4398c33786",
    "name": "Test",
    "email": "test22@test.pl",
    "createdAt": "2019-10-29T19:08:03.266Z",
    "updatedAt": "2019-10-30T10:46:33.085Z",
    "__v": 3

}

## Delete user with all geo information

### Request

`DELETE /users/me`

    curl -i -H 'Accept: application/json,  Authorization: Bearer <AUTH_TOKEN>' -X DELETE -d -d "{\"name\":\"Test\",\"email\":\"test22@test.pl\",\"password\":\"password\",\"age\":\"23\"}" http://localhost:3000/users/me

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 41

    {
    "age": 23,
    "_id": "5db88e13f194da4398c33786",
    "name": "Test",
    "email": "test22@test.pl",
    "createdAt": "2019-10-29T19:08:03.266Z",
    "updatedAt": "2019-10-30T10:46:33.085Z",
    "__v": 3

}

## Attempt to login on non-existing account

### Request

`POST /users/login`

    curl --header "Content-Type: application/json" -d "{\"email\":\"adam@email.com\",\"password\":\"password\"}" http://localhost:3000/users/login

### Response

    HTTP/1.1 400 Bad Request
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 400 Bad Request
    Connection: close
    Content-Type: application/json
    Content-Length: 0

## Delete a geo info by ID

### Request

`DELETE /geoinfos/:id`

    curl -i -H 'Accept: application/json, Authorization: Bearer <AUTH_TOKEN> ' -X DELETE http://localhost:3000/geoinfos/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 200 OK
    Connection: close

    {
      "location": {
      "geoname_id": 4887398,
      "capital": "Washington D.C.",
      "languages": [
      {
      "_id": "5db96c61c75d8314ae7645aa",
      "code": "en",
      "name": "English",
      "native": "English"
      }
      ],
      "country_flag": "http://assets.ipstack.com/flags/us.svg",
      "country_flag_emoji": "🇺🇸",
      "country_flag_emoji_unicode": "U+1F1FA U+1F1F8",
      "calling_code": "1",
      "is_eu": false
      },
      "\_id": "5db96c61c75d8314ae7645a9",
      "ip": "172.32.23.211",
      "type": "ipv4",
      "continent_code": "NA",
      "continent_name": "North America",
      "country_name": "United States",
      "region_code": "IL",
      "region_name": "Illinois",
      "city": "Chicago",
      "zip": "60608",
      "latitude": 41.84885025024414,
      "longitude": -87.67124938964844,
      "user": "5db95e2d24e8cf19011821d4",
      "createdAt": "2019-10-30T10:56:33.425Z",
      "updatedAt": "2019-10-30T10:56:33.425Z",
      "\_\_v": 0
    }

## Live example

    https://vast-cove-25609.herokuapp.com/
