# Hoax Detection For Everyone (HOFE)

**HOFE API** to detect fake news.

This API provides interfaces for registering, logging in, logging out, and verifying whether news is fake or not. Users can access the latest hoax news information and make predictions on specific news articles using their URLs. To access all endpoints, users must have a valid access token.

## Endpoints

### User Login

> **POST** `/api/auth/login`

#### Request Body
```json
{
  "email": "string",  // Unique email address
  "password": "string"  // User's password
}

#### Response Body
```json
{
  "statusCode": 200,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5c..."
}
```

#### Example use with cURL:
```bash
curl -X POST https://[our-api]/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "johndoe@example.com",
    "password": "securepassword123"
  }'
```

---

### User Register

> **POST** `/api/auth/register`

#### Request Body
```json
{
  "username": "string",  // Unique username
  "email": "string",     // Unique email address
  "password": "string"   // User's password
}
```

#### Response Body
```json
{
  "statusCode": 201,
  "message": "Registration successful",
  "user": {
    "username": "johndoe",
    "email": "johndoe@example.com",
    "password": "$2b$10$ZvxynoZlJfvB7eJcoS88neEhG2g0DTzgCOGhKQnxmyEEdx/t4P8ti"
  }
}
```

#### Example use with cURL:
```bash
curl -X POST https://[our-api]/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "johndoe@example.com",
    "password": "securepassword123"
  }'
```

---

### User Logout

> **GET** `/api/auth/logout`

#### Headers
- `Authorization`: `your_jwt_token_here` (token from login)

#### Example use with cURL:
```bash
curl -X GET https://[our-api]/api/auth/logout -H "Authorization: your_jwt_token_here"
```

---

### Get News

> **GET** `/api/news`

Retrieve news categorized as hoax.

#### Headers
- `Authorization`: `Bearer <your_access_token>` (token from login)

#### Response Body
```json
[
  {
    "title": "SMP Student Kills Friend in Violent Attack",
    "link": "https://turnbackhoax.id/2024/11/24/salah-siswa-smp-aniaya-teman-hingga-tewas/",
    "date": "November 24, 2024",
    "image": "https://turnbackhoax.id/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-24-at-17.43.57-326x245.jpeg",
    "content": "In reality, the victim is still alive and just unconscious during the incident.",
    "category": "Hoax"
  },
  ...
]
```

#### Example use with cURL:
```bash
curl -X GET https://[our-api]/api/news -H "Authorization: Bearer <your_access_token>"
```

---

### Predict News

> **POST** `/api/news/predict`

Make a prediction on whether the news is a hoax or not.

#### Headers
- `Authorization`: `Bearer <your_access_token>` (token from login)

#### Request Body
```json
{
  "url": "string"  // URL of the news to be predicted
}
```

#### Response Body
```json
{
  "statusCode": 200,
  "prediction": "Valid",  // or "Invalid" for hoax news
  "text": "example news text"
}
```

#### Example use with cURL:
```bash
curl -X POST https://[our-api]/api/news/predict \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDM0Nzk4YTYyMTBiODcwOGEwYzI5NCIsInVzZXJuYW1lIjoiYWppbWF1bGFuYSIsImlhdCI6MTczMjQ2MjU3NCwiZXhwIjoxNzMyNDY2MTc0fQ.Smp5K2xeAv_7n3803Wnk4Sd-KeMLrWQI0yRoSfF-5Rc" \
  -H "Content-Type: application/json" \
  -d '{"url": "news-url"}'
```

---

### User Profile

> **GET** `/api/user/profile`

#### Headers
- `Authorization`: `Bearer <your_access_token>` (token from login)

#### Response Body
```json
{
  "is": "empty!"
}
```

#### Example use with cURL:
```bash
curl -X GET https://[our-api]/api/user/profile -H "Authorization: Bearer <your_access_token>"
```
