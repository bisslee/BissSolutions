/**
 * Script para converter imagens para WebP
 * Mantém as imagens originais e cria versões .webp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Diretórios para processar
const directories = [
  'public/images/slides',
  'public/images/services',
  'public/images/about',
  'public/images/clients',
  'public/images/products',
  'public/images/partners'
];

// Configurações de qualidade
const config = {
  quality: 85, // Qualidade WebP (0-100)
  effort: 6,   // Esforço de compressão (0-6, mais alto = melhor compressão)
};

/**
 * Converte uma imagem para WebP
 */
async function convertToWebP(inputPath, outputPath) {
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;

    await sharp(inputPath)
      .webp({ quality: config.quality, effort: config.effort })
      .toFile(outputPath);

    const newStats = fs.statSync(outputPath);
    const newSize = newStats.size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(2);

    console.log(`✅ ${path.basename(inputPath)}`);
    console.log(`   Original: ${(originalSize / 1024).toFixed(2)} KB`);
    console.log(`   WebP: ${(newSize / 1024).toFixed(2)} KB`);
    console.log(`   Economia: ${savings}%\n`);

    return { original: originalSize, webp: newSize };
  } catch (error) {
    console.error(`❌ Erro ao converter ${inputPath}:`, error.message);
    return null;
  }
}

/**
 * Processa todos os arquivos em um diretório
 */
async function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`⚠️  Diretório não encontrado: ${dirPath}\n`);
    return { count: 0, originalTotal: 0, webpTotal: 0 };
  }

  console.log(`\n📁 Processando: ${dirPath}`);
  console.log('─'.repeat(60));

  const files = fs.readdirSync(dirPath);
  const imageExtensions = ['.jpg', '.jpeg', '.png'];

  let count = 0;
  let originalTotal = 0;
  let webpTotal = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();

    if (imageExtensions.includes(ext)) {
      const inputPath = path.join(dirPath, file);
      const outputPath = path.join(dirPath, file.replace(ext, '.webp'));

      // Pula se o WebP já existe e é mais recente
      if (fs.existsSync(outputPath)) {
        const inputStats = fs.statSync(inputPath);
        const outputStats = fs.statSync(outputPath);

        if (outputStats.mtime > inputStats.mtime) {
          console.log(`⏭️  ${file} - WebP já existe e está atualizado\n`);
          continue;
        }
      }

      const result = await convertToWebP(inputPath, outputPath);

      if (result) {
        count++;
        originalTotal += result.original;
        webpTotal += result.webp;
      }
    }
  }

  return { count, originalTotal, webpTotal };
}

/**
 * Função principal
 */
async function main() {
  console.log('\n🖼️  CONVERSOR DE IMAGENS PARA WEBP');
  console.log('═'.repeat(60));
  console.log(`Qualidade: ${config.quality}%`);
  console.log(`Esforço: ${config.effort}/6`);
  console.log('═'.repeat(60));

  let totalConverted = 0;
  let totalOriginalSize = 0;
  let totalWebpSize = 0;

  for (const dir of directories) {
    const result = await processDirectory(dir);
    totalConverted += result.count;
    totalOriginalSize += result.originalTotal;
    totalWebpSize += result.webpTotal;
  }

  // Resumo final
  console.log('\n═'.repeat(60));
  console.log('📊 RESUMO FINAL');
  console.log('═'.repeat(60));
  console.log(`Imagens convertidas: ${totalConverted}`);
  console.log(`Tamanho original total: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Tamanho WebP total: ${(totalWebpSize / 1024 / 1024).toFixed(2)} MB`);

  if (totalOriginalSize > 0) {
    const totalSavings = ((totalOriginalSize - totalWebpSize) / totalOriginalSize * 100).toFixed(2);
    console.log(`Economia total: ${totalSavings}%`);
    console.log(`Espaço economizado: ${((totalOriginalSize - totalWebpSize) / 1024 / 1024).toFixed(2)} MB`);
  }

  console.log('═'.repeat(60));
  console.log('✨ Conversão concluída!\n');
}

// Verificar se sharp está instalado
try {
  require.resolve('sharp');
  main().catch(console.error);
} catch (e) {
  console.error('\n❌ Erro: Pacote "sharp" não encontrado!');
  console.error('\n💡 Execute o comando abaixo para instalar:');
  console.error('   npm install --save-dev sharp\n');
  process.exit(1);
}

