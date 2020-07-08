import { Queue, QueueEvents } from "bullmq";

function getRandomInt(max: number) {
	return Math.floor(Math.random() * Math.floor(max));
}

function getRandomColor() {
	const colors = ["red", "green", "blue", "yellow", "violet", "purple"];
	return colors[getRandomInt(colors.length)];
}

const paintQueue = new Queue("Color", {
	connection: {
		host: "localhost",
		port: 6379,
	},
});

const paintQueueEvents = new QueueEvents("Color");

paintQueueEvents.on("completed", (data) => {
	console.log("completed - data:", data);
});

paintQueueEvents.on("failed", (jobId, err) => {
	console.log("failed - jobId:", jobId);
	console.log("failed - err:", err);
});

import express from "express";
const app = express();
app.get("/add-job", (req, res) => {
	const data = {
		color: getRandomColor(),
	};
	paintQueue.add("test", data);
	res.send(data);
});
app.listen(8080, () => {
	console.log("app is now running");
});
