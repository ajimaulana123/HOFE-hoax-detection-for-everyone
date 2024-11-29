### HOFE Model - Hoax and Fake News Detection using RNN

#### Model Name: **HOFE (Hoax and Fake News Detection Model)**

#### Description:
The **HOFE** model is a hoax detection model built using **RNN** (Recurrent Neural Network) architecture, which is widely used for sequence modeling tasks such as natural language processing. This model is designed to classify news articles or information as either "fake news" or "real news" based on the provided text. HOFE leverages the power of RNNs to understand the sequential nature of text, capturing contextual relationships between words and phrases within a news article to identify fake news patterns.

#### Approach:
- **RNN (Recurrent Neural Network)**: The **HOFE** model utilizes an RNN architecture, which is designed to work with sequences of data. RNNs are effective in text classification tasks because they can learn the dependencies between words and phrases in a sentence. However, unlike LSTM or GRU, vanilla RNNs can struggle with long-range dependencies, but they still perform well for many text classification tasks when combined with techniques like tokenization and padding.

- **Dataset**: The dataset used to train the **HOFE** model consists of hoax news and real news articles that have been cleaned and preprocessed to ensure data quality and diversity.

- **Training Process**: The model is trained using an RNN-based architecture. The training process involves tokenizing the text, padding sequences to ensure uniform input lengths, and optimizing the model's performance using the Adam optimizer. The model is evaluated based on accuracy, precision, and recall metrics, which help measure its effectiveness in detecting fake news.

#### Steps for Creation:
1. **Data Preprocessing**: The text from news articles is preprocessed by removing irrelevant characters, lowercasing all words, and performing stemming to get their base forms.
2. **Tokenization and Padding**: The preprocessed text is tokenized, where each word is converted into a sequence of numbers. The sequences are then padded to ensure that all input sequences are of uniform length.
3. **Model Training**: The RNN-based model is trained on the tokenized and padded text data. The model typically includes one or more RNN layers followed by dense layers for classification. The training process uses a split dataset consisting of training, validation, and testing sets.
4. **Evaluation and Testing**: After training, the model is evaluated on the test set to measure its accuracy, precision, and recall in detecting fake news. The model is fine-tuned to improve performance if needed.

#### Model Implementation:
The model can be used to verify the authenticity of various types of news articles by requiring only the text of the article. Once the input text is provided, the model classifies whether the news is a hoax or real based on the patterns it has learned during training.

#### Results:
The **HOFE** model achieves strong performance in distinguishing fake news from real news. With accuracy rates ranging between 80-90% on the test dataset, the model shows promising potential in helping users verify circulating news. The model can be implemented in web or mobile applications, where users can input a news title or body to check its authenticity.

---

### API Implementation for News Classification

To integrate the **HOFE** model into an application or service, you can use the following API to make predictions based on a given news article. The API accepts the text of a news article and returns a prediction on whether the news is a hoax or real.

#### API Endpoint:

**POST** `/api/news/predict`

**Base URL**: `https://[our-api]`

#### Request Format:
The API accepts JSON formatted input containing the news article text.

##### Example Request:

```bash
curl -X POST https://[our-api]/predict \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Kartu Tanda Penduduk (KTP) adalah dokumen identitas resmi yang wajib dimiliki oleh setiap Warga Negara Indonesia (WNI) berusia 17 tahun ke atas. Tidak hanya sebagai identitas diri, KTP juga digunakan untuk berbagai keperluan administrasi. Karena sering digunakan, KTP sering mengalami kerusakan fisik seperti patah, terkelupas, atau tidak dapat terbaca."
  }'
```

#### Response Format:
The response will include the prediction of the news article, indicating whether it is real or fake.

##### Example Response:

```json
{
  "prediction": "valid",
  "text": "Kartu Tanda Penduduk (KTP) adalah dokumen identitas resmi yang wajib dimiliki oleh setiap Warga Negara Indonesia (WNI) berusia 17 tahun ke atas. Tidak hanya sebagai identitas diri, KTP juga digunakan untuk berbagai keperluan administrasi. Karena sering digunakan, KTP sering mengalami kerusakan fisik seperti patah, terkelupas, atau tidak dapat terbaca"
}
```

#### Explanation:
- **Request**: The text of the news article is sent in the body of the POST request under the key `"text"`.
- **Response**: The API returns a JSON response with the key `"prediction"`, which will have the value `"real"` or `"fake"` based on the model's prediction.

#### How to Use the API:
1. **Send a POST request** to the endpoint with a valid news article text in JSON format.
2. **Interpret the result**:
   - `"valid"`: The model predicts the news article as real.
   - `"hoax"`: The model predicts the news article as hoax.

This API allows for seamless integration into web or mobile applications where users can input news content and receive immediate feedback on its authenticity.

---

### Summary of Changes:
In this version of the **HOFE** model, we have replaced the **BERT** architecture with a more lightweight **RNN-based architecture**. The RNN model processes the sequential nature of text data and classifies news articles based on patterns learned during training. This makes the model effective for tasks like fake news detection, while being computationally less intensive than transformer-based models like BERT.
