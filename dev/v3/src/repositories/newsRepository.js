import axios from "axios";
import * as cheerio from "cheerio";

const fetchNewsFromUrl = async (url) => {
  const { data: mainPageData } = await axios.get(url, {
     headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      },
  });

  return cheerio.load(mainPageData);
};

const fetchPrediction = async (text) => {
  const { data } = await axios.post(
    "https://web-production-b9e1.up.railway.app/predict",
    { texts: [text] }
  );
  return data;
};

export { fetchNewsFromUrl, fetchPrediction };