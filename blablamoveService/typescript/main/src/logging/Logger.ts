import winston = require("winston");
import {LoggingLevel} from "./LoggingLevel";
import {format} from "winston";
const { combine, timestamp, label, prettyPrint, simple } = winston.format;

export class Logger {
    private logger: winston.Logger;

    constructor(){

        const myformat = format.printf((info) => {
            return `${info.timestamp} : ${info.level.toUpperCase()} : ${info.message}`
        });

        this.logger = winston.createLogger({
            format : combine(
                timestamp(),
                myformat,
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'combined.log' })
            ]
        });
    }

    log(level: LoggingLevel,msg: string){
        this.logger.log({
            level : level.levelString,
            message: msg
        })
    }
}
