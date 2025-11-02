# Troubleshooting Guide

## Yarn Dev Komutu Çalışmıyor

### 1. Database Connection Hatası (ECONNREFUSED)

**Hata:**
```
ConnectionRefusedError [SequelizeConnectionRefusedError]
code: 'ECONNREFUSED'
```

**Çözümler:**

#### A. PostgreSQL Çalışıyor mu Kontrol Et

```bash
# macOS
brew services list | grep postgresql

# PostgreSQL'i başlat
brew services start postgresql

# veya
pg_ctl -D /usr/local/var/postgres start
```

#### B. .env Dosyasını Kontrol Et

```bash
cd server
cp example.env .env
```

`.env` dosyasında şu değerleri düzenle:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=movie_ticket_booking
DB_USER=postgres
DB_PASSWORD=your_actual_password
```

#### C. Database Oluştur

PostgreSQL'e bağlan ve database oluştur:

```bash
# PostgreSQL'e bağlan
psql -U postgres

# SQL komutu çalıştır
CREATE DATABASE movie_ticket_booking;
\q
```

#### D. Database Bilgilerini Kontrol Et

```bash
# PostgreSQL'e bağlanmayı dene
psql -h localhost -U postgres -d movie_ticket_booking

# Eğer bağlanamıyorsan, şifreni kontrol et
```

### 2. TypeScript/Nodemon Hataları

**Hata:** `Cannot find module` veya `ts-node` çalışmıyor

**Çözüm:**

```bash
# Bağımlılıkları yeniden yükle
cd server
yarn install

# ts-node çalışıyor mu kontrol et
yarn ts-node --version
```

### 3. Port Zaten Kullanımda

**Hata:** `EADDRINUSE: address already in use :::3000`

**Çözüm:**

```bash
# Port 3000'i kullanan process'i bul ve kapat
lsof -ti:3000 | xargs kill -9

# veya .env'de farklı port kullan
PORT=3001
```

### 4. Node Modules Sorunu

**Çözüm:**

```bash
cd server
rm -rf node_modules
rm yarn.lock  # veya package-lock.json
yarn install
```

## Hızlı Kontrol Listesi

- [ ] PostgreSQL çalışıyor mu? (`brew services list`)
- [ ] `.env` dosyası var mı? (`ls -la .env`)
- [ ] `.env` dosyasında doğru database bilgileri var mı?
- [ ] Database oluşturulmuş mu?
- [ ] `yarn install` çalıştırıldı mı?
- [ ] Port 3000 boş mu?

## Test Komutları

```bash
# PostgreSQL bağlantısını test et
psql -h localhost -U postgres -d movie_ticket_booking

# Server'ı test et (database olmadan)
NODE_ENV=development yarn dev

# Environment variables'ları kontrol et
cat .env | grep DB_
```

