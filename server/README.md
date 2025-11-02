# Movie Ticket Booking - Backend API Server

Node.js + TypeScript + Express.js + Sequelize ORM + PostgreSQL ile geliştirilmiş backend API server.

## 🛠️ Teknolojiler

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Cache:** Redis (opsiyonel)

## 📁 Proje Yapısı

```
server/
├── src/
│   ├── app.ts              # Express app configuration
│   ├── server.ts          # Server startup
│   ├── config/            # Configuration files
│   │   └── database.ts    # Sequelize database config
│   ├── models/            # Sequelize models
│   ├── controllers/       # Request handlers
│   ├── services/          # Business logic
│   ├── routes/            # Express routes
│   ├── middleware/        # Custom middleware
│   ├── validators/        # Request validators
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── package.json
└── tsconfig.json
```

## 🚀 Kurulum

### 1. Bağımlılıkları Yükle

```bash
yarn install
```

### 2. Environment Variables

`.env` dosyası oluştur ve gerekli değişkenleri ayarla:

```bash
# example.env dosyasını .env olarak kopyala
cp example.env .env

# .env dosyasını düzenle ve değerleri kendi ayarlarına göre güncelle
```

### 3. PostgreSQL Database Oluştur

```sql
CREATE DATABASE movie_ticket_booking;
```

### 4. Development Mode'da Çalıştır

```bash
yarn dev
```

### 5. Production Build

```bash
yarn build
yarn start
```

## 📝 Scripts

- `yarn dev` - Development mode (nodemon ile)
- `yarn build` - TypeScript build
- `yarn start` - Production mode
- `yarn migrate` - Database migrations çalıştır
- `yarn seed` - Seed data yükle

## 🔧 Örnek Kullanım

### Model Oluşturma

```typescript
// src/models/user.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
  public id!: number;
  public email!: string;
  public name!: string;
}

User.init({
  email: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize,
  tableName: 'users',
});
```

### Route Oluşturma

```typescript
// src/routes/users.ts
import { Router } from 'express';
import { getAllUsers } from '../controllers/user-controller';

const router = Router();

router.get('/', getAllUsers);

export default router;
```

## 🌐 API Endpoints

- `GET /health` - Health check endpoint

## 📄 Lisans

ISC
