# Bangalore Pincode Explorer 📍

A full-stack, production-quality web application that enables users to look up corresponding Bangalore area and locality names by 6-digit Indian PIN codes.

Built with **React**, **Vite**, **Express.js**, and **MongoDB**.

---

## 🚀 Features

- **Instant Bangalore Locality Lookup**: Enter any valid 6-digit Bangalore PIN code (e.g. `560034`, `560001`, `560066`) to fetch its locality, city, and state.
- **Client & Server Input Validation**: Strict regular expression checks (`^[1-9][0-9]{5}$`) on both frontend and backend.
- **Glassmorphic & Responsive UI**: Clean, mobile-friendly design with responsive layout, quick-chip search suggestions, copy-to-clipboard, and loading states.
- **Robust Error Handling**: Distinct visual feedback and standard HTTP status codes for invalid format (`400`), unknown pincode (`404`), network errors, and server errors (`500`).
- **Indexed Database Queries**: MongoDB schema equipped with B-tree indexes for fast query resolution.
- **Automated Seeding & Integration Testing**: Ready-to-run seed script (`npm run seed`) and backend integration test suite (`npm test`).

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+)
- **Styling**: Modern Vanilla CSS (Glassmorphism, CSS Variables, Flexbox/Grid)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Module System**: ES6 Modules (`"type": "module"`)
- **Security**: Helmet, CORS

### Database
- **Database**: MongoDB (Atlas compatible)
- **ODM**: Mongoose

### Testing & Tooling
- **Testing**: Vitest & Supertest (with `mongodb-memory-server` for zero-dependency testing)
- **Environment**: `dotenv`

---

## 🏗 Architecture & Flow

```text
┌──────────────────────────────────────┐
│        React Single Page App         │
│          (Vite Client UI)            │
└──────────────────┬───────────────────┘
                   │  HTTP GET /api/pincodes/:pincode
                   ▼
┌──────────────────────────────────────┐
│          Express REST API            │
│  (Helmet / CORS / Regex Validation)  │
└──────────────────┬───────────────────┘
                   │  Mongoose Query findOne({ pincode })
                   ▼
┌──────────────────────────────────────┐
│        MongoDB Collection            │
│     (B-Tree Indexed Pincodes)        │
└──────────────────────────────────────┘
```

---

## 📖 API Documentation

### 1. Retrieve Pincode Details

- **Endpoint**: `GET /api/pincodes/:pincode`
- **Description**: Returns Bangalore area details for a valid 6-digit PIN code.

#### Success Response (`200 OK`)
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

#### Invalid Input Response (`400 Bad Request`)
```json
{
  "success": false,
  "message": "Please provide a valid 6-digit PIN code."
}
```

#### Not Found Response (`404 Not Found`)
```json
{
  "success": false,
  "message": "No area found for this PIN code."
}
```

---

### 2. Health Check

- **Endpoint**: `GET /api/health`
- **Description**: Verifies that the API server is up and healthy.

#### Response (`200 OK`)
```json
{
  "success": true,
  "message": "Server is healthy"
}
```

---

## ⚡ Indexing Rationale: Why Index `pincode`?

In `server/src/models/pincode.model.js`, the `pincode` field is explicitly indexed:

```javascript
pincode: {
  type: String,
  required: true,
  unique: true,
  index: true
}
```

### Why this is critical:
1. **Lookup Performance ($O(\log N)$ vs $O(N)$)**: Without an index, MongoDB must perform a full collection scan (*COLLSCAN*) checking every document sequentially. With a B-tree index (*IXSCAN*), queries execute in logarithmic time $O(\log N)$.
2. **Read-Heavy Workload**: A PIN code explorer is primarily read-heavy. Indexing minimizes disk I/O and query latency.
3. **Uniqueness Constraint**: The unique index guarantees data integrity, preventing duplicate PIN code entries during seeding or manual insertion.

---

## 📁 Project Structure

```text
Bangalore_Pincode_Explorer/
├── client/                      # React Frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx    # Input & validation
│   │   │   ├── ResultCard.jsx   # Result display & copy
│   │   │   └── ErrorMessage.jsx # Error banner
│   │   ├── services/
│   │   │   └── pincodeApi.js    # API service client (fetch)
│   │   ├── App.jsx              # Main App layout & state
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Global modern CSS styling
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
│
├── server/                      # Node.js/Express Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js            # Mongoose DB connection
│   │   ├── controllers/
│   │   │   └── pincode.controller.js # API logic
│   │   ├── models/
│   │   │   └── pincode.model.js      # Mongoose Schema
│   │   ├── routes/
│   │   │   └── pincode.routes.js     # Route definitions
│   │   ├── middleware/
│   │   │   └── error.middleware.js   # Error middleware
│   │   ├── app.js               # Express application
│   │   └── server.js            # Server entry point
│   ├── scripts/
│   │   └── seed.js              # Database seed script
│   ├── tests/
│   │   └── pincode.test.js      # Integration test suite
│   ├── package.json
│   └── .env.example
│
├── package.json                 # Root convenience scripts
└── README.md                    # Project documentation
```

---

## ⚙️ Environment Variables

### Server (`server/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/bangalore_pincodes
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Client (`client/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- MongoDB running locally OR a MongoDB Atlas URI string

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd Bangalore_Pincode_Explorer

# Install all dependencies (root, server, client)
npm run setup
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` in both `server/` and `client/` directories:
```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

### 3. Seed Database
Populate MongoDB with authentic Bangalore PIN code mappings:
```bash
npm run seed
```

### 4. Start Development Servers
Run backend API and frontend Vite dev server concurrently:
```bash
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api/health

---

## 🧪 Running Tests

Execute backend API tests:
```bash
npm test
```
*Note: Tests utilize `mongodb-memory-server` and run in-memory automatically without requiring an active external MongoDB server.*

---

## 🌐 Deployment Instructions

### Frontend (Vercel / Netlify)
1. Push code to GitHub repository.
2. Import project into Vercel/Netlify with Root Directory set to `client`.
3. Set Build Command to `npm run build` and Output Directory to `dist`.
4. Add Environment Variable: `VITE_API_BASE_URL=https://your-backend-api.onrender.com`.

### Backend (Render / Railway)
1. Deploy `server` folder to Render/Railway as a Web Service.
2. Build Command: `npm install`.
3. Start Command: `npm start`.
4. Add Environment Variables:
   - `MONGODB_URI`: MongoDB Atlas connection string.
   - `CLIENT_URL`: Deployed frontend URL.
   - `NODE_ENV`: `production`.
5. Run `npm run seed` in your production terminal to populate MongoDB Atlas.

---

## 🔮 Future Improvements

- **Reverse Lookup / Area Search**: Allow users to search by locality name and get corresponding PIN codes.
- **Sub-locality & Post Office Breakdown**: Display multiple post office branches per PIN code.
- **Interactive Map Integration**: Render interactive Leaflet/Mapbox maps highlighting the pincode region bounds.
- **Redis Caching**: Cache high-frequency PIN lookups to reduce MongoDB database hits.
- **Autocompletion**: Provide real-time autocomplete as the user types 6-digit digits.
