import axios from "axios";
import * as cheerio from "cheerio";

const fetchNewsFromUrl = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
    },
  });
  return cheerio.load(data);
};

const fetchPrediction = async (text) => {
  const { data } = await axios.post(
    "https://web-production-b9e1.up.railway.app/predict",
    { texts: [text] }
  );
  return data;
};

export { fetchNewsFromUrl, fetchPrediction };
