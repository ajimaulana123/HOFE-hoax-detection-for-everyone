import {
  fetchNewsFromUrl,
  fetchPrediction,
} from "../repositories/newsRepository.js";


const checkNewsForHoaxByText = async (payload) => {
  const allowedKeys = ["text"];
  const receivedKeys = Object.keys(payload);

  // Jika tidak ada key text atau ada key lain
  if (
    !receivedKeys.includes("text") ||
    receivedKeys.some((key) => !allowedKeys.includes(key))
  ) {
    throw new Error(
      `Request body hanya boleh mengandung key: ${allowedKeys.join(
        ", "
      )}, yang anda kirimkan ${receivedKeys}`
    );
  }

  const { text } = payload;

  if (!text) {
    throw new Error("Text tidak boleh kosong");
  }

  const predictionResults = await fetchPrediction(text);
  return predictionResults;
};

const checkNewsForHoaxByUrl = async (payload) => {
  const allowedKeys = ["url"];
  const receivedKeys = Object.keys(payload);

  // Jika tidak ada key url atau ada key lain
  if (
    !receivedKeys.includes("url") ||
    receivedKeys.some((key) => !allowedKeys.includes(key))
  ) {
    throw new Error(
      `Request body hanya boleh mengandung key: ${allowedKeys.join(
        ", "
      )}, yang anda kirimkan ${receivedKeys}`
    );
  }

  const { url } = payload;

  if (!url) {
    throw new Error("URL tidak boleh kosong");
  }

  const $ = await fetchNewsFromUrl(url);

  // Ekstraksi konten dari elemen yang relevan
  let content = "";

  const selectors = [
    "article",
    "div.content",
    "section",
    "div.main",
    "div.body",
    "div.entry",
    "div.post",
    ".news-content",
    ".article-body",
    ".story-body",
    ".entry-content",
    "#content",
    "#main-article",
    ".post-content",
    ".article-text",
    ".news-body",
    ".content-body",
    ".news-article",
    ".text-body",
    ".main-content",
    ".blog-post",
    ".story-text",
    ".full-article",
    "#main-content",
    "#article-body",
    "#news-body",
    "#post-content",
    "#article-text",
    "#content-wrapper",
    "#news-wrapper",
    "#main-article",
    "#article-header",
    "#article-footer",
  ];

  selectors.forEach((selector) => {
    if ($(selector).length) content = $(selector).text();
  });

  if (!content.trim()) {
    $("p").each((_, el) => {
      content += $(el).text() + "\n";
    });
  }

  if (!content.trim()) {
    throw new Error("Konten kosong atau tidak relevan");
  }

  const cleanText = content
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

    // Hitung jumlah kata
  const wordCount = cleanText.split(/\s+/).length;

  // Validasi jumlah kata
  if (wordCount < 200) {
    throw new Error(
      "Konten berita terlalu singkat (kurang dari 200 kata). Link berita tidak didukung."
    );
  }
                    
  const predictionResults = await fetchPrediction(cleanText);
  return { prediction: predictionResults[0].prediction, text: cleanText };
};

const getAllNews = async (baseUrl) => {
  const $ = await fetchNewsFromUrl(baseUrl);

  let latestOptionUrl = '';
  
        $('select option').each((index, element) => {
            const value = $(element).attr('value');
            if (value && !latestOptionUrl) {
                latestOptionUrl = value; // Ambil URL terbaru (indeks pertama)
            }
        });


  if (!latestOptionUrl) {
    throw new Error("No latest URL found");
  }
  const $$ = await fetchNewsFromUrl(latestOptionUrl);
  const articles = [];
  $$("article").each((index, element) => {
    const title = $$(element).find(".entry-title a").text().trim();
    const link = $$(element).find(".entry-title a").attr("href").trim();
    const date = $$(element).find(".mh-meta-date").text().trim();
    const image = $$(element).find(".mh-loop-thumb img").attr("src");
    const content = $$(element).find(".mh-excerpt p").text().trim();

    const checkHoax = (text) => {
      const regex = /\[(.*?)\]/;
      const match = text.match(regex);
      const cleanTitle = text.replace(regex, "").trim();

      if (match) {
        const wordInsideParentheses = match[1].trim();
        return wordInsideParentheses === "valid"
          ? { statusCategory: "Valid", cleanTitle }
          : { statusCategory: "Hoax", cleanTitle };
      } else {
        return { statusCategory: "Unknown", cleanTitle: text };
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

  return articles;
};

export { checkNewsForHoaxByText, checkNewsForHoaxByUrl, getAllNews };