import { Worker } from "bullmq";

const worker = new Worker("Color", async (job) => {
	console.log("worker1 -> accepting job id:", job.id);
	if (job.id && +job.id % 2 === 1) {
		throw new Error("Error on worker1");
	}
	return await forWorker1(job.data.color);
});

async function forWorker1(data: any) {
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log("worker1 -> data", data);
			resolve({
				data: "worker1-" + data,
			});
		}, 1000);
	});
}

import express from "express";
const app = express();
app.listen(8081, () => {
	console.log("app is now running");
});
