/**
 * cli starter
 */
import * as commandLineArgs from "command-line-args";

import Logger from "./util/Logger";
import ArgsReader from "./cli/ArgsReader";
import InputReader from "./cli/InputReader";
import RecordSorter from "./app/RecordSorter";
import OutputWriter from "./cli/OutputWriter";
import App from "./cli/App";

// simple DI container emulation
let logger = new Logger();
let argsReader = new ArgsReader(logger, commandLineArgs);
let inputReader = new InputReader(logger);
let recordSorter = new RecordSorter(logger);
let outputWriter = new OutputWriter(logger);
let app = new App(
    logger,
    argsReader,
    inputReader,
    recordSorter,
    outputWriter
);

// run the application
app.run();
