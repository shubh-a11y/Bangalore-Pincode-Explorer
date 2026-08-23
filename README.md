# 📍 Bangalore Pincode Explorer

<p align="center">
  A clean, responsive full-stack application for finding Bangalore areas and localities using a 6-digit Indian PIN code.
</p>

<p align="center">
  <a href="https://github.com/shubh-a11y/Bangalore-Pincode-Explorer">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repository">
  </a>
</p>

---

## 🖥️ Preview

<p align="center">
  <img src="https://github.com/user-attachments/assets/36819996-00de-4feb-ac87-5153eeddc225" width="49%" alt="Bangalore Pincode Explorer - Main Interface">
  <img src="https://github.com/user-attachments/assets/b9b6ebe6-54d0-4cde-8bcd-b4affbd13082" width="49%" alt="Bangalore Pincode Explorer - Search Result">
</p>

The application provides a simple interface for entering a Bangalore PIN code and retrieving the corresponding area, city, and state.

---

## ✨ Features

* 🔎 **Instant Pincode Lookup** — Search Bangalore localities using a 6-digit PIN code.
* ✅ **Client & Server Validation** — Input is validated independently on both frontend and backend.
* 📱 **Responsive UI** — Works across desktop and mobile devices.
* 🎨 **Glassmorphic Interface** — Modern UI with responsive layouts and CSS variables.
* ⚡ **Loading States** — Clear feedback while requests are being processed.
* 📋 **Copy to Clipboard** — Easily copy returned pincode information.
* 🚨 **Robust Error Handling** — Handles invalid input, unknown pincodes, network failures, and server errors.
* 🗄️ **Indexed MongoDB Queries** — Pincode lookups use an indexed field for efficient retrieval.
* 🌱 **Database Seeding** — Includes a ready-to-run seed script.
* 🧪 **Integration Testing** — Backend API tests using Vitest and Supertest.
* 🔐 **Security Middleware** — Uses Helmet and controlled CORS configuration.

---

## 🛠️ Tech Stack

### Frontend

<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
</p>

### Backend

<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="ES6+">
</p>

### Database

<p>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose">
</p>

### Testing & Tools

<p>
  <img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest">
  <img src="https://img.shields.io/badge/Supertest-333333?style=for-the-badge" alt="Supertest">
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
</p>

---

## 🏗️ Architecture

```text
┌───────────────────────────────────────────┐
│              React + Vite                 │
│               Frontend                    │
└─────────────────────┬─────────────────────┘
                      │
                      │ HTTP GET
                      │ /api/pincodes/:pincode
                      ▼
┌───────────────────────────────────────────┐
│             Express.js API                │
│                                           │
│  Validation → Controller → Error Handler  │
└─────────────────────┬─────────────────────┘
                      │
                      │ Mongoose
                      ▼
┌───────────────────────────────────────────┐
│              MongoDB Atlas                │
│                                           │
│       Indexed Pincode Collection           │
└───────────────────────────────────────────┘
```

### Request Flow

```text
User enters PIN
      ↓
React validates input
      ↓
GET /api/pincodes/:pincode
      ↓
Express validates request
      ↓
Mongoose queries MongoDB
      ↓
Indexed pincode lookup
      ↓
JSON response
      ↓
React displays locality
```

---

## 📖 API Documentation

### `GET /api/pincodes/:pincode`

Returns Bangalore locality information for a valid 6-digit PIN code.

**Example request**

```http
GET /api/pincodes/560034
```

### Success — `200 OK`

```json
{
  "success": true,
  "data": {
    "pincode": "560034",
    "area": "Koramangala",
    "city": "Bangalore",
    "state": "Karnataka"
  }
}
```

### Invalid Input — `400 Bad Request`

```json
{
  "success": false,
  "message": "Please provide a valid 6-digit PIN code."
}
```

### Pincode Not Found — `404 Not Found`

```json
{
  "success": false,
  "message": "No area found for this PIN code."
}
```

---

### `GET /api/health`

Used to verify that the backend is running.

**Response**

```json
{
  "success": true,
  "message": "Server is healthy"
}
```

---

## ⚡ Database Indexing

The `pincode` field is indexed in the Mongoose schema:

```javascript
pincode: {
  type: String,
  required: true,
  unique: true,
  index: true
}
```

### Why index the pincode?

A pincode lookup is an ideal use case for an index because the application primarily performs exact-match read queries.

```text
Without Index
      ↓
COLLSCAN
      ↓
Check documents one by one

With Index
      ↓
IXSCAN
      ↓
Locate matching pincode efficiently
```

The unique constraint also prevents duplicate pincode records.

> **Note:** MongoDB uses B-tree-based indexes for standard indexes. The actual query plan can be inspected with MongoDB's `explain()` functionality.

---

## 📁 Project Structure

```text
Bangalore-Pincode-Explorer/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx
│   │   │   ├── ResultCard.jsx
│   │   │   └── ErrorMessage.jsx
│   │   │
│   │   ├── services/
│   │   │   └── pincodeApi.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── pincode.controller.js
│   │   ├── models/
│   │   │   └── pincode.model.js
│   │   ├── routes/
│   │   │   └── pincode.routes.js
│   │   ├── middleware/
│   │   │   └── error.middleware.js
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── scripts/
│   │   └── seed.js
│   │
│   ├── tests/
│   │   └── pincode.test.js
│   │
│   ├── package.json
│   └── .env.example
│
├── package.json
├── .gitignore
└── README.md
```

---

## ⚙️ Environment Variables

### Server

Create:

```text
server/.env
```

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/bangalore_pincodes
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

For MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string.

### Client

Create:

```text
client/.env
```

```env
VITE_API_BASE_URL=http://localhost:5000
```

> **Never commit `.env` files or database credentials to GitHub.**

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* MongoDB local instance **or** MongoDB Atlas
* Git

### 1. Clone the repository

```bash
git clone https://github.com/shubh-a11y/Bangalore-Pincode-Explorer.git

cd Bangalore-Pincode-Explorer
```

### 2. Install dependencies

```bash
npm run setup
```

### 3. Configure environment variables

Create `.env` files using the provided `.env.example` files.

### 4. Seed the database

```bash
npm run seed
```

This populates MongoDB with the Bangalore pincode dataset.

### 5. Start the application

```bash
npm run dev
```

The application will be available at:

```text
Frontend → http://localhost:5173
Backend  → http://localhost:5000
Health   → http://localhost:5000/api/health
```

---

## 🧪 Testing

Run the backend integration tests:

```bash
npm test
```

The tests use:

* Vitest
* Supertest
* MongoDB Memory Server

Therefore, the integration tests can run without requiring an external MongoDB instance.

---

## 🌐 Deployment

### Frontend — Vercel / Netlify

1. Import the GitHub repository.
2. Set the root directory to `client`.
3. Build command:

```bash
npm run build
```

4. Output directory:

```text
dist
```

5. Configure:

```env
VITE_API_BASE_URL=https://your-backend-api.onrender.com
```

### Backend — Render / Railway

1. Deploy the `server` directory as a Node.js web service.
2. Build command:

```bash
npm install
```

3. Start command:

```bash
npm start
```

4. Configure:

```env
MONGODB_URI=<your-mongodb-atlas-uri>
CLIENT_URL=<your-deployed-frontend-url>
NODE_ENV=production
```

5. Seed the production database:

```bash
npm run seed
```

---

## 🔮 Future Improvements

* 🔍 Reverse lookup — search by locality to find PIN codes.
* 🏤 Multiple post-office results for a single PIN code.
* 🗺️ Interactive map integration using Leaflet or Mapbox.
* ⚡ Redis caching for frequently searched PIN codes.
* ⌨️ Search autocomplete.
* 📊 Search analytics and usage statistics.
* 🔄 CI/CD pipeline for automated testing and deployment.

---

## 👨‍💻 Author

**Shubhang Singh**

Computer Science & Engineering
IIIT Naya Raipur

[![GitHub](https://img.shields.io/badge/GitHub-shubh--a11y-181717?style=for-the-badge\&logo=github)](https://github.com/shubh-a11y)

---

<p align="center">
  Built with ❤️ using React, Node.js, Express.js & MongoDB
</p>
