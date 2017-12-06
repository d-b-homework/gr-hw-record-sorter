# Setting up #
Server should have nodejs/npm installed (tested with `nodejs v4.2.6` and `npm v3.5.2`).
```
git checkout <repo> <repo-root>
cd <repo-root>
npm i
```

# Running unit-tests #
```
cd <repo-root>
npm run test
```

# Transpiling #
Build and exit:
```
npm run build
```
Build and watch
```
npm run build:w
```

# Running cli #
To run the cli, while being in project root and having project transpiled, use the following command:
```
npm run cli -- \
    --input-file=<path-to-input-file> \
    --input-format=<pipe|comma|space> \
    --output-sort=<gender|birthday|name>
```
for example
```
npm run cli -- \
    --input-file=./cli/sample-file/01.dat
    --input-format=pipe
    --output-sort=gender
```

# Running server #
Start server using transpiled code
```
npm run server
```
Start server and reload automaticaly when transpiled code changes
```
npm run server:w
```
Server will be available using port 8080:
```
http://hostname:8080/