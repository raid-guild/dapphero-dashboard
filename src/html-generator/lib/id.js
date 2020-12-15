const { nanoid } = require('nanoid');

const generateUniqueId = (length = 4) => nanoid(length);

module.exports = { generateUniqueId };
