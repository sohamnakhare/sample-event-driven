const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  for (const record of event.Records) {
    try {
      // Parse the message body
      const messageBody = JSON.parse(record.body);
      
      // Process the message
      console.log('Processing message:', messageBody);
      
      // Here, you would typically add your business logic to handle the message
      // For example:
      // await processMessage(messageBody);
      
      console.log('Successfully processed message:', record.messageId);
      
      // If processing is successful, the message will be automatically deleted from the queue
    } catch (error) {
      console.error('Error processing message:', record.messageId, error);
      
      // If there's an error, the message won't be deleted and will be retried
      // You might want to implement custom error handling here
    }
  }

  return { statusCode: 200, body: 'Processed messages' };
};

// Example of a function to process a single message
// async function processMessage(message) {
//   // Implement your message processing logic here
//   // For example:
//   // - Save data to a database
//   // - Call another API
//   // - Perform some computation
// }