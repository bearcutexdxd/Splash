const randomstring = require('randomstring');

function makeid() {
  return randomstring.generate(5);
}

module.exports = { makeid };
