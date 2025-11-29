# 🚀 Quick Start - Conversão para WebP

## ⚡ Início Rápido (3 passos)

### 1️⃣ Instalar Sharp
```bash
npm install --save-dev sharp
```

### 2️⃣ Converter Imagens
```bash
npm run convert-webp
```

### 3️⃣ Ver Resultados
O script irá:
- ✅ Converter todas JPG/PNG para WebP
- ✅ Manter originais intactos
- ✅ Mostrar economia de espaço
- ✅ Pular arquivos já convertidos

---

## 📊 Exemplo de Saída

```
🖼️  CONVERSOR DE IMAGENS PARA WEBP
════════════════════════════════════════════

📁 Processando: public/images/slides
✅ bi.jpg
   Original: 1245.67 KB
   WebP: 456.23 KB
   Economia: 63.38%

📊 RESUMO FINAL
════════════════════════════════════════════
Imagens convertidas: 24
Economia total: 55.43%
Espaço economizado: 8.55 MB
✨ Conversão concluída!
```

---

## 💻 Próximos Passos

Após converter, você precisa atualizar o código para usar WebP:

### Opção 1: Simples (Usar no Carousel)
```html
<picture>
  <source srcset="/images/slides/bi.webp" type="image/webp">
  <img src="/images/slides/bi.jpg" alt="BI" loading="lazy">
</picture>
```

### Opção 2: Completa (Com Responsivo)
```html
<picture>
  <!-- WebP Mobile -->
  <source 
    srcset="/images/slides/bi-mobile.webp" 
    media="(max-width: 768px)" 
    type="image/webp">
  
  <!-- WebP Desktop -->
  <source 
    srcset="/images/slides/bi.webp" 
    type="image/webp">
  
  <!-- Fallback JPG -->
  <img 
    src="/images/slides/bi.jpg" 
    alt="Business Intelligence"
    loading="lazy">
</picture>
```

---

## 📚 Documentação Completa

Para guia detalhado, veja: [IMAGE_CONVERSION_GUIDE.md](./IMAGE_CONVERSION_GUIDE.md)

---

## 🎯 Ganho Esperado

- **Tamanho**: Redução de ~50-60%
- **LCP Mobile**: De 7.8s para ~3-4s
- **Performance**: Score de 24 para 60-70

---

## ❓ Problemas?

### Sharp não instala?
```bash
npm install --save-dev sharp --legacy-peer-deps
```

### Quer ajustar qualidade?
Edite `scripts/convert-to-webp.js`:
```javascript
quality: 90, // Aumentar de 85 para 90
```

---

**✨ É isso! Simples e rápido!**
