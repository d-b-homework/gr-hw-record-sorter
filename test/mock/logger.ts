import * as sinon from "sinon";
import Logger from "../../src/util/Logger";

let logger: Logger = new Logger();
sinon.stub(logger, "info").callsFake(() => {});
sinon.stub(logger, "error").callsFake(() => {});

export default logger;