const serverless = require("serverless-http");
const express = require("express");
const awsSdk = require('@aws-sdk/client-sqs');
const { S3Client } = require("@aws-sdk/client-s3");
const app = express();

const sqs = new awsSdk.SQS({region: 'us-east-1'});
const AWS = require('aws-sdk');

// Initialize the S3 client
const s3 = new AWS.S3({
    region: 'us-east-1', // Specify your region
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});


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
  console.log('process.env.SQS_URL: ', process.env.SQS_URL);
  await sqs.sendMessage({
    QueueUrl: process.env.SQS_URL,
    MessageGroupId: '123',
    MessageBody: JSON.stringify({ message: `Hello from push to queue! ${Date.now()}` }),
  });

  return res.status(200).json({
    message: "Hello from push to queue!",
  });
});

app.get("/presigned-url", async (req, res, next) => {
  const { Key } = req.query;
  
  const url = await s3.getSignedUrlPromise('putObject', {
    Bucket: 'sample-event-driven-bucket-1',
    Key,
    Expires: 60,
  });

  return res.status(200).json({
    url,
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});



exports.handler = serverless(app);
