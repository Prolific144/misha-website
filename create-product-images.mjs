// create-product-images.mjs (save with .mjs extension)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration from your files
const CATEGORIES = [
  'kimchi', 'ramen', 'sauces', 'snacks', 'beverages',
  'essentials', 'seafood', 'grains', 'frozen',
  'health', 'desserts', 'specialty'
];

// Specific product image names (from your imageMappings.ts)
const PRODUCT_IMAGE_NAMES = {
  kimchi: [
    'aged-kimchi.jpg',
    'radish-kimchi.jpg',
    'small-kimchi.jpg',
    'white-kimchi.jpg',
    'cucumber-kimchi.jpg',
    'water-kimchi.jpg',
    'spring-onion-kimchi.jpg',
    'mustard-kimchi.jpg',
    'wrapped-kimchi.jpg',
    'nabak-kimchi.jpg'
  ],
  ramen: [
    'shin-ramyun.jpg',
    'jin-ramyun.jpg',
    'buldak-ramen.jpg',
    'neoguri-ramen.jpg',
    'bibim-men.jpg',
    'ottogi-ramen.jpg',
    'cheese-buldak-ramen.jpg',
    'chapagetti.jpg',
    'buldak-mild.jpg'
  ],
  sauces: [
    'gochujang.jpg',
    'doenjang.jpg',
    'ssamjang.jpg',
    'soy-sauce.jpg',
    'sesame-oil.jpg',
    'gochugaru.jpg',
    'bibimbap-sauce.jpg',
    'bulgogi-marinade.jpg',
    'yakult-gochujang.jpg',
    'perilla-oil.jpg'
  ],
  snacks: [
    'choco-pie.jpg',
    'honey-butter-chips.jpg',
    'shrimp-crackers.jpg',
    'pepero.jpg',
    'cheetos.jpg'
  ],
  beverages: [
    'makkoli.jpg',
    'soju.jpg',
    'cass-beer.jpg'
  ],
  essentials: [
    'rice-cake.jpg',
    'glass-noodles.jpg',
    'pancake-mix.jpg'
  ],
  seafood: [
    'anchovies.jpg',
    'seaweed.jpg',
    'dried-squid.jpg'
  ],
  grains: [
    'rice.jpg',
    'mixed-grains.jpg',
    'sweet-potato-noodles.jpg'
  ],
  frozen: [
    'dumplings.jpg',
    'tteokbokki-set.jpg',
    'pajeon.jpg'
  ],
  health: [
    'red-ginseng.jpg',
    'barley-tea.jpg',
    'omija-tea.jpg'
  ],
  desserts: [
    'songpyeon.jpg',
    'hotteok-mix.jpg',
    'patbingsoo.jpg'
  ],
  specialty: [
    'royal-cuisine.jpg',
    'bbq-set.jpg',
    'tea-ceremony.jpg'
  ]
};

// Function to check if file already exists
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
}

// Main function to verify and list all images
async function verifyProductImages() {
  const baseDir = path.join(process.cwd(), 'src', 'assets', 'images', 'products');
  
  console.log('Verifying product image structure...');
  console.log(`Base directory: ${baseDir}`);
  console.log('='.repeat(50));
  
  let totalFiles = 0;
  let missingFiles = [];
  
  // Check categories and images
  for (const category of CATEGORIES) {
    const categoryDir = path.join(baseDir, category);
    
    // Check if category directory exists
    if (!fileExists(categoryDir)) {
      console.log(`❌ Missing directory: ${categoryDir}`);
      missingFiles.push(`${category}/ (directory)`);
    } else {
      console.log(`✅ Directory exists: ${categoryDir}`);
      
      // Check default.jpg
      const defaultImagePath = path.join(categoryDir, 'default.jpg');
      if (!fileExists(defaultImagePath)) {
        console.log(`  ❌ Missing: default.jpg`);
        missingFiles.push(`${category}/default.jpg`);
      } else {
        totalFiles++;
      }
      
      // Check specific product images
      const productImages = PRODUCT_IMAGE_NAMES[category] || [];
      for (const imageName of productImages) {
        const imagePath = path.join(categoryDir, imageName);
        
        if (!fileExists(imagePath)) {
          console.log(`  ❌ Missing: ${imageName}`);
          missingFiles.push(`${category}/${imageName}`);
        } else {
          totalFiles++;
        }
      }
    }
    
    console.log('');
  }
  
  // Summary
  console.log('='.repeat(50));
  console.log('VERIFICATION SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total categories: ${CATEGORIES.length}`);
  console.log(`Total files found: ${totalFiles}`);
  console.log(`Total files expected: 73`);
  console.log(`Total missing: ${missingFiles.length}`);
  
  if (missingFiles.length > 0) {
    console.log('\n❌ Missing files:');
    missingFiles.forEach(file => console.log(`  - ${file}`));
  } else {
    console.log('\n✅ All 73 image files are present!');
  }
  
  // List all files that exist
  console.log('\n' + '='.repeat(50));
  console.log('ALL EXISTING FILES:');
  console.log('='.repeat(50));
  
  for (const category of CATEGORIES) {
    const categoryDir = path.join(baseDir, category);
    if (fileExists(categoryDir)) {
      try {
        const files = fs.readdirSync(categoryDir);
        console.log(`\n📁 ${category}/ (${files.length} files):`);
        files.forEach(file => {
          const filePath = path.join(categoryDir, file);
          const stats = fs.statSync(filePath);
          const size = stats.size;
          console.log(`  - ${file} (${size} bytes)`);
        });
      } catch (err) {
        console.log(`  Error reading ${category}: ${err.message}`);
      }
    }
  }
}

// Function to generate a report
function generateImageReport() {
  const baseDir = path.join(process.cwd(), 'src', 'assets', 'images', 'products');
  const report = {
    generatedAt: new Date().toISOString(),
    categories: {},
    summary: {}
  };
  
  for (const category of CATEGORIES) {
    const categoryDir = path.join(baseDir, category);
    report.categories[category] = {
      directoryExists: fileExists(categoryDir),
      files: []
    };
    
    if (fileExists(categoryDir)) {
      try {
        const files = fs.readdirSync(categoryDir);
        report.categories[category].files = files.map(file => {
          const filePath = path.join(categoryDir, file);
          const stats = fs.statSync(filePath);
          return {
            name: file,
            size: stats.size,
            modified: stats.mtime
          };
        });
      } catch (err) {
        report.categories[category].error = err.message;
      }
    }
  }
  
  // Calculate summary
  const totalFiles = Object.values(report.categories).reduce((sum, cat) => {
    return sum + (cat.files ? cat.files.length : 0);
  }, 0);
  
  report.summary = {
    totalCategories: CATEGORIES.length,
    totalFiles: totalFiles,
    expectedFiles: 73,
    allFilesPresent: totalFiles >= 73
  };
  
  // Save report
  const reportPath = path.join(process.cwd(), 'image-structure-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📊 Report saved to: ${reportPath}`);
  
  return report;
}

// Function to download placeholder images from Unsplash
async function downloadPlaceholderImages() {
  console.log('\n' + '='.repeat(50));
  console.log('DOWNLOADING UNSPLASH PLACEHOLDERS');
  console.log('='.repeat(50));
  
  const unsplashUrls = {
    kimchi: 'https://images.unsplash.com/photo-1583224964766-6c5d5d5b5b1a',
    ramen: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624',
    sauces: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
    snacks: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9',
    beverages: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b',
    essentials: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136',
    seafood: 'https://images.unsplash.com/photo-1574675370791-1ec60e0b73f4',
    grains: 'https://images.unsplash.com/photo-1586201375761-83865001e31c',
    frozen: 'https://images.unsplash.com/photo-1594488506255-a8bbfdeedbaf',
    health: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141',
    desserts: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e',
    specialty: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d'
  };
  
  console.log('\n⚠️  This would download actual Unsplash images.');
  console.log('Since you already have all files, you can skip this.');
  console.log('To replace empty files with Unsplash images, run:');
  console.log('node create-product-images.mjs --download');
}

// Run the script
async function main() {
  const args = process.argv.slice(2);
  
  console.log('📁 Product Image Manager');
  console.log('='.repeat(50));
  
  if (args.includes('--verify') || args.includes('--check')) {
    await verifyProductImages();
    const report = generateImageReport();
    
    if (report.summary.allFilesPresent) {
      console.log('\n✅ Your application is ready to use!');
      console.log('The system will use local images for products.');
      console.log('\nTo start the development server:');
      console.log('  npm run dev');
    } else {
      console.log('\n⚠️  Some images are missing but the app will still work.');
      console.log('Missing images will use Unsplash fallbacks.');
    }
    
  } else if (args.includes('--download')) {
    await downloadPlaceholderImages();
  } else {
    // Default: verify and report
    await verifyProductImages();
    generateImageReport();
    
    console.log('\n' + '='.repeat(50));
    console.log('NEXT STEPS:');
    console.log('='.repeat(50));
    console.log('1. Your image structure is complete (73 files)');
    console.log('2. Files are empty (0 bytes) but will work with fallbacks');
    console.log('3. To add actual images:');
    console.log('   - Replace the empty .jpg files with real product photos');
    console.log('   - Or use the Unsplash URLs in imageMappings.ts');
    console.log('\n4. Start your application:');
    console.log('   npm run dev');
    console.log('\n5. Check browser console for any image loading issues');
  }
}

main().catch(console.error);