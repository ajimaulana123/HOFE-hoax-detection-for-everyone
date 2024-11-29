const axios = require("axios");

const ML_SERVICE_URL = process.env.ML_SERVICE_URL;

/**
 * @description Memanggil model ML untuk mendeteksi apakah berita hoaks atau tidak
 * @param {string} text - Konten berita yang ingin dicek
 * @returns {Promise<boolean>} - Mengembalikan true jika berita hoaks, false jika valid
 */
const checkForHoax = async (text) => {
  try {
    const response = await axios.post(`${ML_SERVICE_URL}/predict`, {
      text,
    });
    return response.data.prediction === "hoax";
  } catch (error) {
    throw new Error("Error dalam memeriksa berita: " + error.message);
  }
};

module.exports = {
  checkForHoax,
};
