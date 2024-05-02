import { Worker } from "bullmq";
import nodemailer from "nodemailer";

async function sendEmail(data) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const info = await transporter.sendMail(data);
        console.log(info);
    } catch (error) {
        console.log(error);
    }
}
export const emailWorker = () => {
    console.log({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
    });
    return new Worker(
        "email-Q",
        async (job) => {
            const data = job.data;
            await sendEmail(data);
        },
        {
            connection: {
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT,
                username: process.env.REDIS_USERNAME,
                password: process.env.REDIS_PASSWORD,
            },
        }
    );
};
