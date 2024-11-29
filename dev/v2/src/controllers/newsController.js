import axios from "axios";
import * as cheerio from "cheerio";
import { authenticateToken } from '../middleware/auth.js';

/**
 * @description Mengecek berita apakah hoaks atau tidak
 */
const checkNewsForHoax = [
    authenticateToken, // Pastikan hanya user yang login bisa akses
    async (req, res) => {
        const { text } = req.body; // Ambil teks dari body request

        try {
            const response = await axios.post('https://<our-api-model>/predict', {
                "texts": [text]
            });

            const predictionResults = response.data;
            res.json(predictionResults);
        } catch (error) {
            console.error('Error processing text:', error);
            res.status(500).json({ message: 'Error processing text', error });
        }
    }
];

/**
 * @description Mendapatkan semua berita
 */
const getAllNews = [
    authenticateToken, // Pastikan hanya user yang login bisa akses
    async (req, res) => {
        const baseUrl = 'https://<our-news>/';

        try {
            const { data: mainPageData } = await axios.get(baseUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
                },
            });

            const $ = cheerio.load(mainPageData);
            let latestOptionUrl = '';
            $('select option').each((index, element) => {
                const value = $(element).attr('value');
                if (value && !latestOptionUrl) {
                    latestOptionUrl = value;
                }
            });

            if (!latestOptionUrl) {
                return res.status(404).json({ message: 'No latest URL found' });
            }

            const { data: latestPageData } = await axios.get(latestOptionUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                },
            });

            const $$ = cheerio.load(latestPageData);
            const articles = [];
            $$('article').each((index, element) => {
                const title = $$(element).find('.entry-title a').text().trim();
                const link = $$(element).find('.entry-title a').attr('href').trim();
                const date = $$(element).find('.mh-meta-date').text().trim();
                const image = $$(element).find('.mh-loop-thumb img').attr('src');
                const content = $$(element).find('.mh-excerpt p').text().trim();

                const checkHoax = (text) => {
                    const regex = /\[(.*?)\]/;
                    const match = text.match(regex);
                    const cleanTitle = text.replace(regex, '').trim();

                    if (match) {
                        const wordInsideParentheses = match[1].trim();
                        if (wordInsideParentheses === "valid") {
                            return { statusCategory: "Valid", cleanTitle };
                        } else {
                            return { statusCategory: "Hoax", cleanTitle };
                        }
                    } else {
                        return { status: "Tidak ada kata dalam kurung", cleanTitle: text };
                    }
                };

                const { statusCategory, cleanTitle } = checkHoax(title);
                articles.push({
                    title: cleanTitle,
                    link,
                    date,
                    image,
                    content,
                    category: statusCategory,
                });
            });

            res.json(articles);
        } catch (error) {
            console.error('Error scraping latest news:', error);
            res.status(500).json({ message: 'Error scraping latest news', error });
        }
    }
];

export { checkNewsForHoax, getAllNews };
