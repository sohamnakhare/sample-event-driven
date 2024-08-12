const serverless = require("serverless-http");
const express = require("express");
import { SQS } from '@aws-sdk/client-sqs';
const app = express();

const sqs = new SQS({region: 'us-east-1'});

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.get("/hello-world", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.post("/push-to-queue", async (req, res, next) => {
  await sqs.sendMessage({
    QueueUrl: process.env.SQS_URL,
    MessageBody: JSON.stringify({ message: "Hello from push to queue!" }),
  });

  return res.status(200).json({
    message: "Hello from push to queue!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
