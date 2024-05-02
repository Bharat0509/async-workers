import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter.js";
import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { emailQueue } from "./utils.js";
import { emailWorker } from "./workers/email.worker.js";

import { ExpressAdapter } from "@bull-board/express";

const app = express();

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues: [new BullMQAdapter(emailQueue)],
    serverAdapter: serverAdapter,
});

app.use("/admin/queues", serverAdapter.getRouter());

app.get("/", (req, res) => {
    res.send("Welcome to Workers.");
});

app.listen(8000, () => {
    emailWorker();
    console.log("App running on port 8000");
});
