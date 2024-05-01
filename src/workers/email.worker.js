import { Worker } from "bullmq";
import nodemailer from "nodemailer";

async function sendEmail(data) {
    // const info = await transporter.sendMail(data);
    console.log("Mail sent...");
}
export const emailWorker = () => {
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
