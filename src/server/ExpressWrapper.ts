import * as express from "express";
import RouterRecords from "./RouterRecords";
import RouterHelp from "./RouterHelp";

/**
 * Wrap "Express" to encapsulate initialization
 */
export default class ExpressWrapper {
    private _express: express.Application;

    /**
     * Create and initialize instance of express
     */
    constructor(
        express: Function,
        private bodyParserJson: Function
    ) {
        this._express = express();
        this.middleware();
        this.routes();
    }

    /**
     * Initialize middleware
     */
    private middleware(): void {
        this._express.use(this.bodyParserJson());
        // this._express.use(this.bodyParser.urlencoded({ extended: false }));
    }

    /**
     * Initialize routers
     */
    private routes(): void {
        let recordsPathPrefix = '/records';
        this._express.use('/', RouterHelp.create(recordsPathPrefix));
        this._express.use(recordsPathPrefix, RouterRecords.create());
    }

    /**
     * Get instance of initialized express
     *
     * @returns {express.Application}
     */
    get express(): express.Application {
        return this._express;
    }
}
