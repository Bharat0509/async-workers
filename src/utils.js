import { Queue } from "bullmq";
import * as dotenv from "dotenv";
dotenv.config();

export const emailQueue = new Queue("email-Q", {
    connection: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
    },
});
