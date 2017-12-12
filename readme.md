# Setting up #
Server should have nodejs/npm installed (tested with `nodejs v4.2.6` and `npm v3.5.2`).
```
mkdir <repo-root>
cd <repo-root>
git clone https://github.com/d-b-homework/gr-hw-record-sorter.git .
npm i
```

# Running unit-tests #
To run unit tests, use the following commands:
```
# Run test without coverage reporting
npm run test

# Run test with coverage reporting
npm run test:c
```

# Transpiling #
To transpile the project (from TS to JS), use the following commands:
```
# Build and exit
npm run build

# Build and watch
npm run build:w
```

# Running cli #
To run the cli, transpile the project (see above), and then use the following command:
```
npm run cli -- \
    --input-file=<path-to-input-file> \
    --input-format=<pipe|comma|space> \
    --output-sort=<gender|birthday|name>
```
for example
```
npm run cli -- \
    --input-file=./sample-files/01.dat \
    --input-format=pipe \
    --output-sort=gender
```

# Running server and using #
To start the server, transpile the project (see above), and then use the following command:
```
# Start server using transpiled code
npm run server

# Start server and reload automaticaly when transpiled code changes
npm run server:w
```

Server will be available using port 8080:
```
http://hostname:8080/
```

To POST record, use
- POST `http://hostname:8080/records`
- header `Content-Type: application/json`
- body in format:
```
{
    "firstName": "firstName",
    "lastName": "lastName",
    "gender": "<male|female>",
    "favoriteColor": "color",
    "birthday": "MM/DD/YYYY"
}
```
e.g.
```
    "firstName": "John",
    "lastName": "Smith",
    "gender": "male",
    "favoriteColor": "red",
    "birthday": "10/13/1920"
```

To GET records sorted by gender, use
- GET `http://hostname:8080/records/gender`
- header `Content-Type: application/json`

To GET records sorted by birthday, use
- GET `http://hostname:8080/records/birthday`
- header `Content-Type: application/json`

To GET records sorted by name, use
- GET `http://hostname:8080/records/name`
- header `Content-Type: application/json`

To reset data, restart the server.