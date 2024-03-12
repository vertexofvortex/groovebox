import * as log4js from "log4js";

log4js.configure({
    appenders: {
        file: {
            type: "dateFile",
            filename: `logs/${new Date().toISOString().split("T")[0]}/${new Date().toISOString()}.log`,
            pattern: "yyyy-MM-dd",
        },
        console: {
            type: "console",
        },
    },
    categories: {
        default: {
            appenders: ["file", "console"],
            level: "TRACE",
        },
    },
});
const logger = log4js.getLogger();

export default logger;