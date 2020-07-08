import { Worker } from "bullmq";

const worker = new Worker("Color", async (job) => {
	console.log("worker2 -> accepting job id:", job.id);
	if (job.id && +job.id % 2 === 0) {
		throw new Error("Error on worker2");
	}
	return await forWorker2(job.data.color);
});

async function forWorker2(data: any) {
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log("worker2 -> data", data);
			resolve({
				data: "worker2-" + data,
			});
		}, 5000);
	});
}

import express from "express";
const app = express();
app.listen(8082, () => {
	console.log("app is now running");
});
