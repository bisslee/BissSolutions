#!/usr/bin/env node

/**
 * Script para otimizar imagens do projeto
 * Converte imagens para WebP e cria versões responsivas
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images/optimized');

// Configurações de otimização
const OPTIMIZATION_CONFIG = {
  webp: {
    quality: 85,
    effort: 6
  },
  jpeg: {
    quality: 90,
    progressive: true
  },
  png: {
    quality: 90,
    compressionLevel: 9
  }
};

// Tamanhos responsivos
const RESPONSIVE_SIZES = [
  { width: 320, suffix: '-sm' },
  { width: 640, suffix: '-md' },
  { width: 1024, suffix: '-lg' },
  { width: 1920, suffix: '-xl' }
];

// Função para criar diretório se não existir
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Função para obter informações da imagem
async function getImageInfo(imagePath) {
  try {
    const metadata = await sharp(imagePath).metadata();
    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      size: fs.statSync(imagePath).size
    };
  } catch (error) {
    console.error(`Erro ao obter informações da imagem ${imagePath}:`, error.message);
    return null;
  }
}

// Função para otimizar imagem para WebP
async function optimizeToWebP(inputPath, outputPath, options = {}) {
  try {
    const { width, quality = 85 } = options;
    
    let sharpInstance = sharp(inputPath);
    
    if (width) {
      sharpInstance = sharpInstance.resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }
    
    await sharpInstance
      .webp({ 
        quality,
        effort: 6 
      })
      .toFile(outputPath);
    
    return true;
  } catch (error) {
    console.error(`Erro ao otimizar para WebP ${inputPath}:`, error.message);
    return false;
  }
}

// Função para criar versões responsivas
async function createResponsiveVersions(inputPath, baseOutputPath) {
  const results = [];
  
  for (const size of RESPONSIVE_SIZES) {
    const outputPath = baseOutputPath.replace('.webp', `${size.suffix}.webp`);
    
    const success = await optimizeToWebP(inputPath, outputPath, {
      width: size.width,
      quality: 85
    });
    
    if (success) {
      results.push({
        size: size.width,
        path: outputPath,
        suffix: size.suffix
      });
    }
  }
  
  return results;
}

// Função para processar uma imagem
async function processImage(imagePath, relativePath) {
  console.log(`Processando: ${relativePath}`);
  
  const info = await getImageInfo(imagePath);
  if (!info) return null;
  
  const results = {
    original: {
      path: imagePath,
      size: info.size,
      format: info.format,
      dimensions: `${info.width}x${info.height}`
    },
    optimized: null,
    responsive: []
  };
  
  // Criar diretório de saída
  const outputDir = path.join(OUTPUT_DIR, path.dirname(relativePath));
  ensureDir(outputDir);
  
  // Nome do arquivo de saída
  const baseName = path.basename(imagePath, path.extname(imagePath));
  const webpPath = path.join(outputDir, `${baseName}.webp`);
  
  // Otimizar para WebP
  const webpSuccess = await optimizeToWebP(imagePath, webpPath, {
    quality: 85
  });
  
  if (webpSuccess) {
    const webpInfo = await getImageInfo(webpPath);
    results.optimized = {
      path: webpPath,
      size: webpInfo.size,
      format: 'webp',
      dimensions: `${webpInfo.width}x${webpInfo.height}`,
      compressionRatio: ((info.size - webpInfo.size) / info.size * 100).toFixed(1)
    };
    
    // Criar versões responsivas
    results.responsive = await createResponsiveVersions(imagePath, webpPath);
  }
  
  return results;
}

// Função para percorrer diretórios recursivamente
async function processDirectory(dir, relativeDir = '') {
  const items = fs.readdirSync(dir);
  const results = [];
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const relativePath = path.join(relativeDir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      const subResults = await processDirectory(fullPath, relativePath);
      results.push(...subResults);
    } else if (stat.isFile() && /\.(jpg|jpeg|png|gif)$/i.test(item)) {
      const result = await processImage(fullPath, relativePath);
      if (result) {
        results.push({
          relativePath,
          ...result
        });
      }
    }
  }
  
  return results;
}

// Função principal
async function main() {
  console.log('🚀 Iniciando otimização de imagens...\n');
  
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`❌ Diretório de imagens não encontrado: ${IMAGES_DIR}`);
    process.exit(1);
  }
  
  // Criar diretório de saída
  ensureDir(OUTPUT_DIR);
  
  // Processar todas as imagens
  const results = await processDirectory(IMAGES_DIR);
  
  // Relatório final
  console.log('\n📊 RELATÓRIO DE OTIMIZAÇÃO:');
  console.log('='.repeat(50));
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let processedCount = 0;
  
  results.forEach(result => {
    if (result.optimized) {
      console.log(`\n📁 ${result.relativePath}`);
      console.log(`   Original: ${result.original.format.toUpperCase()} ${result.original.dimensions} (${(result.original.size / 1024).toFixed(1)} KB)`);
      console.log(`   WebP: ${result.optimized.dimensions} (${(result.optimized.size / 1024).toFixed(1)} KB) - ${result.optimized.compressionRatio}% menor`);
      
      if (result.responsive.length > 0) {
        console.log(`   Responsivo: ${result.responsive.length} versões criadas`);
      }
      
      totalOriginalSize += result.original.size;
      totalOptimizedSize += result.optimized.size;
      processedCount++;
    }
  });
  
  const totalSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
  
  console.log('\n' + '='.repeat(50));
  console.log(`✅ Processadas: ${processedCount} imagens`);
  console.log(`📦 Tamanho original: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📦 Tamanho otimizado: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`💰 Economia total: ${totalSavings}% (${((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(2)} MB)`);
  console.log('\n🎉 Otimização concluída!');
}

// Executar se chamado diretamente
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Erro durante a otimização:', error);
    process.exit(1);
  });
}

module.exports = {
  processImage,
  optimizeToWebP,
  createResponsiveVersions
};
