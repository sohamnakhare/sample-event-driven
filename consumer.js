const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

exports.handler = async (event) => {
  console.log('Received SQS event:', JSON.stringify(event, null, 2));

  // Iterate over each record in the SQS event
  for (const record of event.Records) {
    // Process each SQS message
    try {
      const messageBody = JSON.parse(record.body);
      console.log('Processing message:', messageBody);

      // Example processing logic
      // You can replace this with your actual processing logic
      await processMessage(messageBody);

      // Successfully processed, no need to delete the message explicitly,
      // SQS will automatically remove the message if the function succeeds
    } catch (error) {
      console.error('Error processing message:', error);
      // Optionally handle errors here, e.g., send the message to a dead-letter queue
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Messages processed successfully!' }),
  };
};

// Example function to process the message
async function processMessage(message) {
  // Implement your message processing logic here
  // For example, saving data to a database, calling an external API, etc.
  console.log('Message:', message);
  // Simulating processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
}
