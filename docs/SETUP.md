# Setup Dokumentasi Sumber Sandang Store

## Prerequisites

- Node.js 18+
- PostgreSQL atau MySQL
- npm atau yarn
- Google Sheets API Key
- Git

## Installation

### 1. Clone Repository

\`\`\`bash
git clone https://github.com/lia09amel-droid/sumber-sandang-store.git
cd sumber-sandang-store
\`\`\`

### 2. Setup Database

#### PostgreSQL

\`\`\`bash
# Install PostgreSQL
# macOS: brew install postgresql
# Ubuntu: sudo apt-get install postgresql

# Create database
psql
CREATE DATABASE sumber_sandang;
\\q
\`\`\`

### 3. Setup Backend

\`\`\`bash
cd backend

# Copy environment variables
cp .env.example .env

# Edit .env dengan konfigurasi Anda
# DATABASE_URL=postgresql://user:password@localhost:5432/sumber_sandang

# Install dependencies
npm install

# Setup database
npm run db:push

# Run development server
npm run dev
\`\`\`

Server akan berjalan di \`http://localhost:3001\`

### 4. Setup Frontend

\`\`\`bash
cd ../frontend

# Install dependencies
npm install

# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local

# Run development server
npm run dev
\`\`\`

Website akan berjalan di \`http://localhost:3000\`

## Struktur Project

\`\`\`
sumber-sandang-store/
├── frontend/              # Next.js Frontend
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   ├── store/
│   └── public/
│
├── backend/               # Express Backend
│   ├── src/
│   │   ├── index.ts
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   └── db/
│   ├── prisma/
│   └── tsconfig.json
│
└── docs/                  # Dokumentasi
\`\`\`

## API Endpoints

### Health Check
\`\`\`
GET /api/health
\`\`\`

### Products
\`\`\`
GET    /api/products
GET    /api/products/:id
POST   /api/products          (Admin)
PUT    /api/products/:id      (Admin)
DELETE /api/products/:id      (Admin)
\`\`\`

### Orders
\`\`\`
GET    /api/orders            (User)
GET    /api/orders/:id        (User)
POST   /api/orders            (User)
\`\`\`

### Admin Dashboard
\`\`\`
GET    /api/admin/dashboard   (Admin)
GET    /api/admin/sales       (Admin)
GET    /api/admin/stock       (Admin)
GET    /api/admin/financial   (Admin)
\`\`\`

## Troubleshooting

### Database Connection Error

Pastikan PostgreSQL sudah running:
\`\`\`bash
pg_isready
\`\`\`

### Port Already in Use

Ganti PORT di \`.env\`:
\`\`\`
PORT=3002
\`\`\`

## Next Steps

- [ ] Setup Google Sheets API Integration
- [ ] Configure Payment Gateway
- [ ] Deploy to Production

Lihat [FEATURES.md](./FEATURES.md) untuk fitur lengkap.
