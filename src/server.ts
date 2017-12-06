/**
 * server starter
 */
import {createServer} from "http";
import * as express from "express";
import {json as bodyParserJson} from "body-parser";
import ExpressWrapper from "./server/ExpressWrapper";
import App from "./server/App";

// Simple DI container emulation
let expressWrapper = new ExpressWrapper(express, bodyParserJson);
let app = new App(expressWrapper, createServer);

// Start the application
app.start(8080);
