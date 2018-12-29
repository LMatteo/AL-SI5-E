import {LoggingLevel} from "./LoggingLevel";

export = {
    error : new LoggingLevel("error"),
    info : new LoggingLevel("info"),
    verbose : new LoggingLevel("verbose"),
    debug : new LoggingLevel("debug"),
    silly : new LoggingLevel("silly"),
}