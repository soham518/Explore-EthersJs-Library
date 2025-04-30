const prompt = require('prompt')
const schema = {
  properties: {
    privateKey: {
      message: 'Enter Private Key',
      required: true,
      hidden: true
    },
  }
};

async function promptForKey() {
  prompt.start()

  const result = await prompt.get(schema)
  return result.privateKey
}

module.exports = {
  promptForKey,
}
