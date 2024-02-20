import * as log4js from "log4js";

log4js.configure({
    appenders: {
        file: {
            type: "file",
            filename: "debug.log"
        },
        console: {
            type: "console",
        }
    },
    categories: {
        default: {
            appenders: ["file", "console"],
            level: "debug",
        }
    }
});
const logger = log4js.getLogger();
logger.level = "debug";

export default logger;