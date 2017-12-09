/**
 * server starter
 */
import Logger from "./util/Logger";
import App from "./server/App";
import PostRecord from "./server/endpoint/PostRecord";
import GetByGender from "./server/endpoint/GetByGender";
import RequestParser from "./server/RequestParser";
import ResponseGenerator from "./server/ResponseGenerator";
import RecordService from "./app/RecordService";
import GetByName from "./server/endpoint/GetByName";
import GetByBirthday from "./server/endpoint/GetByBirthday";
import RecordSorter from "./app/RecordSorter";

// Simple DI container emulation
let logger = new Logger();
let requestParser = new RequestParser();
let responseGenerator = new ResponseGenerator();
let recordSorter = new RecordSorter(logger);
let recordService = new RecordService(recordSorter);
let postRecord = new PostRecord(
    requestParser,
    recordService,
    responseGenerator
);
let getByGender = new GetByGender(
    recordService,
    responseGenerator
);
let getByBirthday = new GetByBirthday(
    recordService,
    responseGenerator
);
let getByName = new GetByName(
    recordService,
    responseGenerator
);
let app = new App(
    postRecord,
    getByGender,
    getByBirthday,
    getByName
);

// Start the application
app.start(8080);


// import * as express from "express";
// import {createServer} from "http";
// import {json as bodyParserJson} from "body-parser";
// import App from "./server/App";
// import RouterHelp from "./RouterHelp";
// import RouterRecords from "./RouterRecords";

// Simple DI container emulation
// let routerHelp = new RouterHelp();
// let app = new App(
//     express,
//     createServer,
//     bodyParserJson
// );

// Start the application
// app.start(8080);
