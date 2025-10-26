# 🖼️ Guia de Conversão de Imagens para WebP

## 📋 Índice
1. [Instalação](#instalação)
2. [Conversão Automática](#conversão-automática)
3. [Conversão Manual](#conversão-manual)
4. [Implementação no Código](#implementação-no-código)
5. [Verificação](#verificação)

---

## 🚀 Instalação

### Passo 1: Instalar o Sharp
```bash
npm install --save-dev sharp
```

O **Sharp** é uma biblioteca Node.js de alta performance para processamento de imagens.

---

## 🤖 Conversão Automática

### Método Recomendado: Script Automatizado

Criamos um script que converte todas as imagens automaticamente!

#### 1. Executar o script de conversão:
```bash
node scripts/convert-to-webp.js
```

#### 2. O que o script faz:
- ✅ Converte JPG, JPEG e PNG para WebP
- ✅ Mantém as imagens originais
- ✅ Qualidade: 85% (ótimo balanço)
- ✅ Pula arquivos já convertidos
- ✅ Mostra economia de espaço
- ✅ Processa todos os diretórios de imagens

#### 3. Diretórios processados:
- `public/images/slides/` - Imagens do carrossel
- `public/images/services/` - Imagens de serviços
- `public/images/about/` - Imagens sobre
- `public/images/clients/` - Imagens de clientes
- `public/images/products/` - Imagens de produtos
- `public/images/partners/` - Imagens de parceiros

#### 4. Exemplo de saída:
```
🖼️  CONVERSOR DE IMAGENS PARA WEBP
════════════════════════════════════════════
Qualidade: 85%
Esforço: 6/6

📁 Processando: public/images/slides
────────────────────────────────────────────
✅ bi.jpg
   Original: 1245.67 KB
   WebP: 456.23 KB
   Economia: 63.38%

📊 RESUMO FINAL
════════════════════════════════════════════
Imagens convertidas: 24
Tamanho original total: 15.42 MB
Tamanho WebP total: 6.87 MB
Economia total: 55.43%
Espaço economizado: 8.55 MB
```

---

## 🔧 Conversão Manual

### Opção 1: Usando Sharp (Node.js)

```javascript
const sharp = require('sharp');

// Converter uma imagem
sharp('input.jpg')
  .webp({ quality: 85 })
  .toFile('output.webp');

// Converter com mais opções
sharp('input.png')
  .webp({ 
    quality: 85,
    effort: 6,        // Máximo esforço de compressão
    lossless: false   // Compressão com perda (menor tamanho)
  })
  .toFile('output.webp');
```

### Opção 2: Usando CLI (cwebp)

#### Instalar ferramenta:
```bash
# Windows (via Chocolatey)
choco install webp

# Mac (via Homebrew)
brew install webp

# Linux
sudo apt-get install webp
```

#### Converter imagens:
```bash
# Converter uma imagem
cwebp -q 85 input.jpg -o output.webp

# Converter com configurações avançadas
cwebp -q 85 -m 6 -af input.jpg -o output.webp

# Converter lote de imagens (PowerShell)
Get-ChildItem *.jpg | ForEach-Object { cwebp -q 85 $_.FullName -o ($_.BaseName + ".webp") }
```

### Opção 3: Ferramentas Online

1. **Squoosh** (Google): https://squoosh.app/
   - ✅ Interface visual
   - ✅ Comparação lado a lado
   - ✅ Ajuste de qualidade em tempo real

2. **CloudConvert**: https://cloudconvert.com/webp-converter
   - ✅ Conversão em lote
   - ✅ API disponível

---

## 💻 Implementação no Código

### 1. Usando o elemento `<picture>` (Recomendado)

#### Componente Carousel:
```typescript
// carousel.html
<picture>
  <source 
    srcset="/images/slides/bi.webp" 
    type="image/webp">
  <img 
    src="/images/slides/bi.jpg" 
    alt="Business Intelligence"
    loading="lazy">
</picture>
```

#### Com Imagens Responsivas:
```html
<picture>
  <!-- WebP para mobile -->
  <source 
    srcset="/images/slides/bi-mobile.webp" 
    media="(max-width: 768px)" 
    type="image/webp">
  
  <!-- WebP para desktop -->
  <source 
    srcset="/images/slides/bi-desktop.webp" 
    media="(min-width: 769px)" 
    type="image/webp">
  
  <!-- JPG para mobile (fallback) -->
  <source 
    srcset="/images/slides/bi-mobile.jpg" 
    media="(max-width: 768px)">
  
  <!-- JPG para desktop (fallback) -->
  <img 
    src="/images/slides/bi-desktop.jpg" 
    alt="Business Intelligence"
    loading="lazy">
</picture>
```

### 2. Atualizar Componente Carousel

```typescript
// carousel.ts
export interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;      // JPG/PNG original
  imageWebp?: string; // Versão WebP (opcional)
  buttonText: string;
  buttonLink: string;
}

// Exemplo de dados
slides: Slide[] = [
  {
    id: 1,
    title: 'Business Intelligence',
    subtitle: 'Transforme dados em insights',
    image: '/images/slides/bi.jpg',
    imageWebp: '/images/slides/bi.webp', // Adicionar WebP
    buttonText: 'Saiba Mais',
    buttonLink: '/services/analytics'
  }
];
```

```html
<!-- carousel.html -->
<div class="carousel-slide" *ngFor="let slide of slides">
  <picture>
    <source 
      [srcset]="slide.imageWebp || slide.image" 
      type="image/webp">
    <img 
      [src]="slide.image" 
      [alt]="slide.title"
      loading="lazy"
      class="slide-image">
  </picture>
  <div class="slide-content">
    <h2>{{ slide.title }}</h2>
    <p>{{ slide.subtitle }}</p>
  </div>
</div>
```

### 3. Criar um Pipe para Imagens WebP (Opcional)

```typescript
// image-webp.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'webp',
  standalone: true
})
export class WebpPipe implements PipeTransform {
  transform(imagePath: string): string {
    if (!imagePath) return imagePath;
    
    // Substitui extensão por .webp
    return imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }
}

// Uso no template
<picture>
  <source [srcset]="imagePath | webp" type="image/webp">
  <img [src]="imagePath" alt="Imagem">
</picture>
```

### 4. Atualizar image-config.ts

```typescript
// image-config.ts
export const ImageConfig = {
  formats: {
    webp: true,      // Usar WebP quando disponível
    fallback: 'jpg'  // Fallback para JPG
  },
  quality: {
    webp: 85,
    jpg: 80
  },
  // Mapeamento de imagens
  images: {
    slides: {
      bi: {
        webp: '/images/slides/bi.webp',
        jpg: '/images/slides/bi.jpg'
      },
      consultoria: {
        webp: '/images/slides/consultoria.webp',
        jpg: '/images/slides/consultoria.jpg'
      }
    }
  }
};
```

---

## ✅ Verificação

### 1. Verificar arquivos WebP criados:
```bash
# PowerShell
Get-ChildItem -Path public/images -Filter *.webp -Recurse | Select-Object FullName, Length

# Contar arquivos
(Get-ChildItem -Path public/images -Filter *.webp -Recurse).Count
```

### 2. Comparar tamanhos:
```bash
# Ver tamanho de JPG vs WebP
Get-ChildItem public/images/slides/*.jpg | Measure-Object -Property Length -Sum
Get-ChildItem public/images/slides/*.webp | Measure-Object -Property Length -Sum
```

### 3. Testar no navegador:
```javascript
// Console do navegador
// Verificar suporte a WebP
const supportsWebP = document.createElement('canvas')
  .toDataURL('image/webp')
  .indexOf('data:image/webp') === 0;

console.log('Suporte WebP:', supportsWebP);
```

### 4. Verificar no Lighthouse:
```bash
# Rodar Lighthouse após implementação
npm run build
# Servir e testar
```

---

## 📊 Ganhos Esperados

### Tamanhos Típicos

| Formato | Tamanho Médio | Qualidade Visual |
|---------|---------------|------------------|
| JPG Original | 1000 KB | ⭐⭐⭐⭐⭐ |
| JPG Otimizado (80%) | 500 KB | ⭐⭐⭐⭐ |
| WebP (85%) | 350 KB | ⭐⭐⭐⭐⭐ |
| WebP (75%) | 250 KB | ⭐⭐⭐⭐ |

### Performance

| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| LCP (Mobile) | 7.8s | ~3-4s | **50%** |
| FCP (Mobile) | 4.0s | ~2-2.5s | **40%** |
| Tamanho Página | 15 MB | 7 MB | **53%** |
| Lighthouse Score | 24 | 60-70 | **150%** |

---

## 🎯 Checklist de Implementação

### Fase 1: Conversão
- [ ] Instalar Sharp (`npm install --save-dev sharp`)
- [ ] Executar script de conversão (`node scripts/convert-to-webp.js`)
- [ ] Verificar arquivos WebP criados
- [ ] Comparar tamanhos (original vs WebP)

### Fase 2: Implementação
- [ ] Atualizar componente Carousel com `<picture>`
- [ ] Adicionar lazy loading (`loading="lazy"`)
- [ ] Testar fallback para JPG
- [ ] Atualizar outros componentes com imagens

### Fase 3: Otimização
- [ ] Criar versões mobile e desktop
- [ ] Implementar srcset responsivo
- [ ] Adicionar preload para imagem hero
- [ ] Configurar cache para WebP

### Fase 4: Validação
- [ ] Testar em Chrome (suporta WebP)
- [ ] Testar em Safari (suporta WebP desde 2020)
- [ ] Testar em Edge (suporta WebP)
- [ ] Rodar Lighthouse e verificar melhoria
- [ ] Medir LCP e FCP antes/depois

---

## 🛠️ Troubleshooting

### Problema: Sharp não instala no Windows
```bash
# Solução: Instalar com Python e node-gyp
npm install --global node-gyp
npm install --save-dev sharp --legacy-peer-deps
```

### Problema: Imagens WebP não aparecem
- Verificar se o arquivo WebP foi criado
- Verificar permissões do arquivo
- Verificar path no código
- Testar fallback para JPG

### Problema: Qualidade ruim
```javascript
// Aumentar qualidade no script
quality: 90, // Era 85
```

### Problema: Arquivos WebP maiores que originais
- Pode acontecer com PNGs pequenos
- Usar apenas JPG → WebP
- Manter PNG para logos/ícones

---

## 📚 Recursos Adicionais

- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [WebP no Google Developers](https://developers.google.com/speed/webp)
- [Can I Use WebP](https://caniuse.com/webp)
- [Squoosh Tool](https://squoosh.app/)

---

## 💡 Dicas Profissionais

1. **Mantenha sempre o original**: Nunca delete JPG/PNG originais
2. **Use 85% de qualidade**: Melhor balanço qualidade/tamanho
3. **Implemente fallback**: Use `<picture>` para compatibilidade
4. **Lazy loading**: Use `loading="lazy"` em todas as imagens
5. **Responsive images**: Crie versões mobile e desktop
6. **Automação**: Adicione conversão ao build process

---

**✨ Pronto! Agora você tem tudo para converter e implementar WebP no seu projeto!**
