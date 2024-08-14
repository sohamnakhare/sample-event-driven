const accountSid = process.env.TWI_ACC_SID;
const authToken = process.env.TWI_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

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
  return client.messages
  .create({
    body: 'hi from sqs',
    to: '+918149891546', // Text your number
    from: '+12563644316', // From a valid Twilio number
  })
  .then((message) => console.log(message.sid))
  .catch(err => console.error(err));
}
