const accountSid = process.env.TWI_ACC_SID;
const authToken = process.env.TWI_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

exports.handler = async (event) => {
  throw new Error('error');
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
