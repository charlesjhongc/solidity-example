import { default as pLog } from "pino"

export const logger = pLog({
    transport: {
        target: "pino-pretty",
        options: {
            sync: true,
            colorize: true,
            colorizeObjects: true,
            levelFirst: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
        },
    },
})
