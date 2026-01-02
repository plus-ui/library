# Deployment Guide - Dokploy

Bu dokümantasyon, Plus UI docs sitesinin Dokploy üzerinde nasıl deploy edileceğini açıklar.

## Gereksinimler

- Node.js 22+
- pnpm 10+
- Docker

## Dockerfile Özellikleri

Proje kök dizinindeki `Dockerfile` multi-stage build yapısı kullanır:

1. **deps**: Tüm bağımlılıkları yükler
2. **core-builder**: Core kütüphaneyi build eder
3. **docs-builder**: Astro dokümantasyon sitesini build eder
4. **runner**: Production için hafif bir Node.js image'ı ile serve eder

## Dokploy Deployment Adımları

### 1. Repository Bağlantısı

Dokploy panelinde:
- Yeni bir uygulama oluşturun
- Git repository'nizi bağlayın
- Branch: `main` (veya tercih ettiğiniz branch)

### 2. Build Ayarları

**Build Command:** (Otomatik olarak Dockerfile kullanılacak)
```bash
# Dockerfile otomatik algılanacak
```

**Port:** `4000`

### 3. Environment Variables

Gerekli environment variable'lar:
```bash
NODE_ENV=production
PORT=4000
```

### 4. Health Check

Dockerfile içinde health check tanımlıdır:
- Interval: 30s
- Timeout: 3s
- Retries: 3

## Manuel Build (Local Test)

Dockerfile'ı local ortamda test etmek için:

```bash
# Build
docker build -t plusui-docs .

# Run
docker run -p 4000:4000 plusui-docs

# Tarayıcıda http://localhost:4000 adresine gidin
```

## Build Süreleri

- İlk build: ~5-10 dakika
- Cache'li build: ~2-3 dakika

## Optimizasyonlar

1. **Multi-stage Build**: Her stage sadece ihtiyacı olan dosyaları içerir
2. **Layer Caching**: package.json dosyaları önce kopyalanır
3. **Alpine Linux**: Minimal image boyutu (~150MB)
4. **Static Serving**: Built Astro files serve ile sunulur

## Sorun Giderme

### Build Hatası
```bash
# Local build ile test edin
docker build -t plusui-docs .
```

### Port Çakışması
Dockerfile içindeki `EXPOSE 4000` satırını ve Dokploy port ayarlarını kontrol edin.

### Memory Hatası
Dokploy'da container'a daha fazla memory ayırın (minimum 1GB önerilir).

## Güncellemeler

Her git push sonrası Dokploy otomatik build tetikler. Manuel build için:
- Dokploy panelinde "Redeploy" butonuna tıklayın

## İletişim

Sorunlar için: [GitHub Issues](https://github.com/plus-ui/library/issues)
