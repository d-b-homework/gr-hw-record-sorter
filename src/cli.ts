/**
 * CLI starter
 */
import * as commandLineArgs from "command-line-args";
import Logger from "./util/Logger";
import ArgsReader from "./cli/ArgsReader";
import {fs} from "mz";
import InputReader from "./cli/InputReader";
import RecordSorter from "./app/RecordSorter";
import RecordService from "./app/RecordService";
import OutputWriter from "./cli/OutputWriter";
import App from "./cli/App";

// Simple DI container emulation
let logger = new Logger();
let argsReader = new ArgsReader(logger, commandLineArgs);
let inputReader = new InputReader(logger, fs);
let recordSorter = new RecordSorter(logger);
let recordService = new RecordService(recordSorter);
let outputWriter = new OutputWriter(logger, console.log);
let app = new App(
    logger,
    argsReader,
    inputReader,
    recordService,
    outputWriter
);

// Run the application
app.run();
