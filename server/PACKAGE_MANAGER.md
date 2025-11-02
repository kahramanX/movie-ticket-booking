# Package Manager

**Bu proje YARN kullanmaktadır.** ✅

## Yarn Kullanımı (Aktif)

Bu projede **YARN** kullanılıyor - Dashboard ile tutarlılık için.

### Kurulum:
```bash
# Global yarn kurulumu (eğer yoksa)
npm install -g yarn

# Server klasöründe
cd server
yarn install
```

### Komutlar:
```bash
yarn install          # Bağımlılıkları yükle
yarn add <package>    # Paket ekle
yarn add -D <package> # Dev dependency ekle
yarn remove <package> # Paket sil
yarn dev              # Development mode
yarn build            # Build
```

## 2. pnpm (Monorepo için EN İYİ seçenek) ⭐

### Avantajlar:
- ✅ %70 disk tasarrufu
- ✅ 2-3x daha hızlı kurulum
- ✅ Phantom dependencies'i önler
- ✅ Monorepo workspace desteği

### Kurulum:
```bash
# Global pnpm kurulumu
npm install -g pnpm

# Server klasöründe
cd server
pnpm install
```

### Komutlar:
```bash
pnpm install          # Bağımlılıkları yükle
pnpm add <package>    # Paket ekle
pnpm add -D <package> # Dev dependency ekle
pnpm remove <package> # Paket sil
pnpm dev              # Development mode
pnpm build            # Build
```

## 3. npm (Varsayılan)

### Komutlar:
```bash
npm install
npm install <package>
npm install -D <package>
npm run dev
```

## Monorepo için Öneri

**pnpm** monorepo projeler için en iyi seçenektir çünkü:
- Her proje için ayrı `node_modules` yerine merkezi bir store kullanır
- Workspace desteği ile tüm projeleri tek komutla yönetebilirsin
- Disk alanından çok tasarruf sağlar

### Monorepo pnpm Workspace Setup:

Root'ta `pnpm-workspace.yaml` oluştur:
```yaml
packages:
  - 'dashboard'
  - 'server'
  - 'client'
```

Root'ta `package.json`:
```json
{
  "scripts": {
    "dev:server": "pnpm --filter server dev",
    "dev:dashboard": "pnpm --filter dashboard dev",
    "install:all": "pnpm install"
  }
}
```

## Mevcut Durum

- Dashboard: `yarn.lock` var (yarn kullanılıyor) ✅
- Server: `yarn.lock` kullanılıyor (yarn aktif) ✅

**Aktif Package Manager:** Yarn

## Yarn Komutları (Kullan)

```bash
yarn install          # Bağımlılıkları yükle
yarn add <package>    # Paket ekle
yarn add -D <package> # Dev dependency ekle
yarn remove <package> # Paket sil
yarn dev              # Development mode
yarn build            # Build
yarn start            # Production mode
```

