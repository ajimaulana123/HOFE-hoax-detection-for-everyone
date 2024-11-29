const bcrypt = require("bcryptjs");

const hashData = async (data) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(data, salt);
};

module.exports = { hashData };
