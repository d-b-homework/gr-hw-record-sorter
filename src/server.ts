/**
 * Server starter
 */
import Logger from "./util/Logger";
import App from "./server/App";
import GetHelp from "./server/endpoint/GetHelp";
import PostRecord from "./server/endpoint/PostRecord";
import GetByGender from "./server/endpoint/GetByGender";
import GetByName from "./server/endpoint/GetByName";
import GetByBirthday from "./server/endpoint/GetByBirthday";
import RequestParser from "./server/RequestParser";
import ResponseGenerator from "./server/ResponseGenerator";
import RecordService from "./app/RecordService";
import RecordSorter from "./app/RecordSorter";

// Simple DI container emulation
let logger = new Logger();
let requestParser = new RequestParser();
let responseGenerator = new ResponseGenerator();
let recordSorter = new RecordSorter(logger);
let recordService = new RecordService(recordSorter);
let getHelp = new GetHelp();
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
    logger,
    8080,
    getHelp,
    postRecord,
    getByGender,
    getByBirthday,
    getByName
);

// Start the application
app.start();
