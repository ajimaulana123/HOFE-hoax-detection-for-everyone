const axios = require("axios");

const makeApiRequest = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    throw new Error("Error while making API request");
  }
};

module.exports = { makeApiRequest };
