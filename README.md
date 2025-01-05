# HOFE - Hoax Detection For Everyone

> HOFE API to detect hoax news

### Endpoints

#### User Login

> POST /api/auth/login

**Request Body**

* **email (string):** The user's email address. This field is required and must be unique.
* **password (string):** The user's password. This field is required.

**Response Body**

```json
{
	"message":"Login berhasil",
	"token":"eyJhbGciOiJIUzI1NiIsInR5c..."
}
```

**Example Request (using cURL)**

```bash
curl -X POST <our-api>/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "johndoe@gmail.com",
  "password": "your_password"
}'
```

---

#### User Logout

> GET /api/auth/logout

**Headers**

* Authorization: your_jwt_token_here

**Response Body**

```json
{
	"message":"Logout berhasil",
}
```

**Example Request (using cURL)**

```bash
curl -X GET https://<our-api>/api/auth/logout -H "Authorization: your_jwt_token_here"
```

---

#### Get News

> GET /api/news

**Headers**

* Authorization: your_jwt_token_here

**Response Body**

```json
[
	{
		"title": "Siswa SMP Aniaya Teman hingga Tewas",
		"link": "https://turnbackhoax.id/2024/11/24/salah-siswa-smp-aniaya-teman-hingga-tewas/",
		"date": "November 24, 2024",
		"image": "https://turnbackhoax.id/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-24-at-17.43.57-326x245.jpeg",
		"content": "Faktanya, korban kekerasan masih bernyawa dan hanya pingsan saat kejadian.", 
		"category": "Hoax"
	},
	{},
	{},
	...
]
```

**Example Request (using cURL)**

```bash
curl -X GET https://<our-api>/api/news -H "Authorization: Bearer <your_access_token>"
```

---

#### Predict News

> POST /api/news/predict/text

**Headers**

* Authorization: your_jwt_token_here

**Request Body**

* **text as string**

**Response Body**

```json
{
  "prediction": "Valid",  // or "Invalid" for hoax news
  "text": "example news text"
}
```

**Example Request (using cURL)**

```bash
curl -X POST https://<our-api>/api/news/predict/text -H "Authorization: Bearer <u' re token>" \ 
-H "Content-Type: application/json" \
-d '{"url": "url-berita"}'
```

> POST /api/news/predict/url

**Headers**

* Authorization: your_jwt_token_here

**Request Body**

* **url as string**

**Response Body**

```json
{
  "prediction": "Valid",  // or "Invalid" for hoax news
  "text": "example news text"
}
```

**Example Request (using cURL)**

```bash
curl -X POST https://<our-api>/api/news/predict/url \
  -H "Authorization: Bearer <u' re token>" \
  -H "Content-Type: application/json" \
  -d '{"url": "news-url"}'
```

---

#### User Profile

> GET /api/user/profile

**Headers**

* Authorization: your_jwt_token_here

**Response Body**

```json
{
  "username": "johndoe",
  "email": "johndoe@example.com"
}
```

**Example Request (using cURL)**

```bash
curl -X GET https://<our-api>/api/user/profile -H "Authorization: Bearer <your_access_token>"
```
