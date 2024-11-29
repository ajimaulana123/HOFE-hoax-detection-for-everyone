const axios = require("axios");
const db = require("../config/db");
const emailService = require("../services/emailService");
const hoaxDetection = require("../services/hoaxDetection");

/**
 * @description Mengecek berita apakah hoaks atau tidak
 */
const checkNewsForHoax = async (req, res, next) => {
  const { content } = req.body;
  try {
    const isHoax = await hoaxDetection.checkForHoax(content);

    res.json({
      content,
      isHoax,
      message: isHoax
        ? "Berita ini terindikasi hoaks"
        : "Berita ini terindikasi valid",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Mendapatkan semua berita
 */
const getAllNews = async (req, res, next) => {
  try {
    const newsList = await db.selectFrom("news").selectAll().execute();
    res.json(newsList);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Menambahkan berita baru
 */
const addNews = async (req, res, next) => {
  const { title, content } = req.body;
  try {
    const newNews = await db
      .insertInto("news")
      .values({ title, content })
      .returningAll()
      .executeTakeFirstOrThrow();

    // Kirim notifikasi email
    await emailService.sendEmail(
      "admin@example.com",
      "Berita Baru Ditambahkan",
      `Berita: ${title} telah ditambahkan.`
    );

    res.status(201).json({ message: "Berita berhasil ditambahkan", newNews });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Menghapus berita berdasarkan ID
 */
const deleteNews = async (req, res, next) => {
  const { id } = req.params;
  try {
    await db.deleteFrom("news").where("id", "=", id).executeTakeFirst();
    res.json({ message: "Berita berhasil dihapus" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkNewsForHoax,
  getAllNews,
  addNews,
  deleteNews,
};
