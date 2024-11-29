const nodemailer = require("nodemailer");

// Konfigurasi transporter email
const transporter = nodemailer.createTransport({
  service: "gmail", // atau gunakan SMTP server lain
  auth: {
    user: process.env.NODEMAILER_USERNAME,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

/**
 * Mengirim email
 * @param {string} to - Alamat email penerima
 * @param {string} subject - Subjek email
 * @param {string} text - Isi email dalam format teks
 */
const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.NODEMAILER_USERNAME,
      to,
      subject,
      text,
    });
    console.log("Email terkirim ke:", to);
  } catch (error) {
    console.error("Gagal mengirim email:", error);
  }
};

module.exports = { sendEmail };
