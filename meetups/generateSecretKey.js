const crypto = require('crypto');

const generateRandomString = (length) => {
  return crypto.randomBytes(length).toString('hex');
};

const jwtSecret = generateRandomString(32); 

console.log(`${jwtSecret}`);

// module.exports = jwtSecret;
