import {
  checkNewsForHoaxByText,
  checkNewsForHoaxByUrl,
  getAllNews,
} from "../services/newsService.js";
import { authenticateToken } from "../middleware/auth.js";

const handleCheckNewsForHoaxByText = [
  authenticateToken,
  async (req, res) => {
  try {
    const result = await checkNewsForHoaxByText(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
    }
  },
];

const handleCheckNewsForHoaxByUrl = [
  authenticateToken,
  async (req, res) => {
  try {
    const result = await checkNewsForHoaxByUrl(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
    }
  },
];

const handleGetAllNews = [
  authenticateToken,
  async (req, res) => {
    try {
      const baseUrl = "https://turnbackhoax.id/";
      const articles = await getAllNews(baseUrl);
    res.json(articles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

export {
  handleCheckNewsForHoaxByText,
  handleCheckNewsForHoaxByUrl,
  handleGetAllNews,
};
