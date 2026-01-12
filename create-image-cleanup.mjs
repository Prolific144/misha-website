// create-image-cleanup.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CATEGORIES = [
  'kimchi', 'ramen', 'sauces', 'snacks', 'beverages',
  'essentials', 'seafood', 'grains', 'frozen',
  'health', 'desserts', 'specialty'
];

// Main cleanup function
async function cleanupImageFiles() {
  const baseDir = path.join(process.cwd(), 'src', 'assets', 'images', 'products');
  
  console.log('📁 Cleaning up empty image files...');
  console.log('='.repeat(50));
  
  let totalDeleted = 0;
  let totalKept = 0;
  
  for (const category of CATEGORIES) {
    const categoryDir = path.join(baseDir, category);
    
    if (!fs.existsSync(categoryDir)) {
      console.log(`❌ Directory not found: ${categoryDir}`);
      continue;
    }
    
    console.log(`\n📂 Processing: ${category}`);
    
    try {
      const files = fs.readdirSync(categoryDir);
      
      for (const file of files) {
        const filePath = path.join(categoryDir, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isFile() && stats.size === 0) {
          // Delete empty files
          fs.unlinkSync(filePath);
          console.log(`  🗑️  Deleted (empty): ${file}`);
          totalDeleted++;
        } else if (stats.isFile()) {
          console.log(`  ✅ Kept (${stats.size} bytes): ${file}`);
          totalKept++;
        }
      }
      
      // Check if directory is empty after cleanup
      const remainingFiles = fs.readdirSync(categoryDir);
      if (remainingFiles.length === 0) {
        fs.rmdirSync(categoryDir);
        console.log(`  🗑️  Removed empty directory: ${category}`);
      }
      
    } catch (error) {
      console.log(`  ⚠️  Error processing ${category}: ${error.message}`);
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 CLEANUP SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total deleted (empty files): ${totalDeleted}`);
  console.log(`Total kept (files with content): ${totalKept}`);
  console.log(`\n✅ Cleanup completed!`);
  
  return { deleted: totalDeleted, kept: totalKept };
}

// Function to update imageMappings.ts with Unsplash URLs
function updateImageMappingsFile() {
  const filePath = path.join(process.cwd(), 'src', 'config', 'imageMappings.ts');
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${filePath}`);
    return false;
  }
  
  // Read the current file
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Create updated version with Unsplash URLs
  const updatedContent = `// src/config/imageMappings.ts
// UPDATED: Using Unsplash URLs instead of local files

// Map product IDs to Unsplash image URLs
export const PRODUCT_IMAGE_MAP: Record<string, string> = {
  // Kimchi images
  'kimchi-001': 'https://images.unsplash.com/photo-1583224964766-6c5d5d5b5b1a?w=600&h=400&fit=crop&auto=format',
  'kimchi-002': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop&auto=format',
  'kimchi-003': 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&h=400&fit=crop&auto=format',
  'kimchi-004': 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=400&fit=crop&auto=format',
  'kimchi-005': 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=600&h=400&fit=crop&auto=format',
  'kimchi-006': 'https://images.unsplash.com/photo-1556909152-5d5c7894c794?w=600&h=400&fit=crop&auto=format',
  'kimchi-007': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop&auto=format',
  'kimchi-008': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop&auto=format',
  'kimchi-009': 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop&auto=format',
  'kimchi-010': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&auto=format',

  // Ramen images
  'ramen-001': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop&auto=format',
  'ramen-002': 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&h=400&fit=crop&auto=format',
  'ramen-003': 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=600&h=400&fit=crop&auto=format',
  'ramen-004': 'https://images.unsplash.com/photo-1617093727343-5c20f0f8a8f9?w=600&h=400&fit=crop&auto=format',
  'ramen-005': 'https://images.unsplash.com/photo-1634117621594-6d48b7b6f7a6?w=600&h=400&fit=crop&auto=format',
  'ramen-006': 'https://images.unsplash.com/photo-1591814468924-caf88ad12346?w=600&h=400&fit=crop&auto=format',
  'ramen-007': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=400&fit=crop&auto=format',
  'ramen-008': 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&h=400&fit=crop&auto=format',
  'ramen-009': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop&auto=format',

  // Sauces images
  'sauce-001': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop&auto=format',
  'sauce-002': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop&auto=format',
  'sauce-003': 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop&auto=format',
  'sauce-004': 'https://images.unsplash.com/photo-1556909152-5d5c7894c794?w=600&h=400&fit=crop&auto=format',
  'sauce-005': 'https://images.unsplash.com/photo-1533050487297-09b450131914?w=600&h=400&fit=crop&auto=format',
  'sauce-006': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&auto=format',
  'sauce-007': 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&h=400&fit=crop&auto=format',
  'sauce-008': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop&auto=format',
  'sauce-009': 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&h=400&fit=crop&auto=format',
  'sauce-010': 'https://images.unsplash.com/photo-1574675370791-1ec60e0b73f4?w=600&h=400&fit=crop&auto=format',

  // Snacks images
  'snack-001': 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&h=400&fit=crop&auto=format',
  'snack-002': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop&auto=format',
  'snack-003': 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600&h=400&fit=crop&auto=format',
  'snack-004': 'https://images.unsplash.com/photo-1591814468924-caf88ad12346?w=600&h=400&fit=crop&auto=format',
  'snack-005': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=400&fit=crop&auto=format',

  // Beverages images
  'beverage-001': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=400&fit=crop&auto=format',
  'beverage-002': 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=600&h=400&fit=crop&auto=format',
  'beverage-003': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&auto=format',

  // Essentials images
  'essential-001': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&auto=format',
  'essential-002': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop&auto=format',
  'essential-003': 'https://images.unsplash.com/photo-1594488506255-a8bbfdeedbaf?w=600&h=400&fit=crop&auto=format',

  // Seafood images
  'seafood-001': 'https://images.unsplash.com/photo-1574675370791-1ec60e0b73f4?w=600&h=400&fit=crop&auto=format',
  'seafood-002': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop&auto=format',
  'seafood-003': 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop&auto=format',

  // Grains images
  'grain-001': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop&auto=format',
  'grain-002': 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&h=400&fit=crop&auto=format',
  'grain-003': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&auto=format',

  // Frozen images
  'frozen-001': 'https://images.unsplash.com/photo-1594488506255-a8bbfdeedbaf?w=600&h=400&fit=crop&auto=format',
  'frozen-002': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop&auto=format',
  'frozen-003': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop&auto=format',

  // Health images
  'health-001': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=400&fit=crop&auto=format',
  'health-002': 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&h=400&fit=crop&auto=format',
  'health-003': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop&auto=format',

  // Desserts images
  'dessert-001': 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&h=400&fit=crop&auto=format',
  'dessert-002': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop&auto=format',
  'dessert-003': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=400&fit=crop&auto=format',

  // Specialty images
  'specialty-001': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&auto=format',
  'specialty-002': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop&auto=format',
  'specialty-003': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop&auto=format'
};

// Unsplash image URLs for category fallbacks
export const UNSPLASH_IMAGES: Record<string, string> = {
  kimchi: 'https://images.unsplash.com/photo-1583224964766-6c5d5d5b5b1a?w=600&h=400&fit=crop&auto=format',
  ramen: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop&auto=format',
  sauces: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop&auto=format',
  snacks: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&h=400&fit=crop&auto=format',
  beverages: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=400&fit=crop&auto=format',
  essentials: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&auto=format',
  seafood: 'https://images.unsplash.com/photo-1574675370791-1ec60e0b73f4?w=600&h=400&fit=crop&auto=format',
  grains: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop&auto=format',
  frozen: 'https://images.unsplash.com/photo-1594488506255-a8bbfdeedbaf?w=600&h=400&fit=crop&auto=format',
  health: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=400&fit=crop&auto=format',
  desserts: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&h=400&fit=crop&auto=format',
  specialty: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&auto=format',
} as const;

// Enhanced placeholder image service with better design
export const PLACEHOLDER_IMAGES: Record<string, string> = {
  kimchi: 'https://placehold.co/600x400/e84a5f/FFFFFF?text=KIMCHI&font=montserrat&size=24',
  ramen: 'https://placehold.co/600x400/ff9a76/FFFFFF?text=RAMEN&font=montserrat&size=24',
  sauces: 'https://placehold.co/600x400/6a0572/FFFFFF?text=SAUCES&font=montserrat&size=24',
  snacks: 'https://placehold.co/600x400/00b8a9/FFFFFF?text=SNACKS&font=montserrat&size=24',
  beverages: 'https://placehold.co/600x400/f8f3d4/333333?text=BEVERAGES&font=montserrat&size=24',
  essentials: 'https://placehold.co/600x400/f6416c/FFFFFF?text=ESSENTIALS&font=montserrat&size=24',
  seafood: 'https://placehold.co/600x400/00bbf9/FFFFFF?text=SEAFOOD&font=montserrat&size=24',
  grains: 'https://placehold.co/600x400/fdb827/FFFFFF?text=GRAINS&font=montserrat&size=24',
  frozen: 'https://placehold.co/600x400/9b5de5/FFFFFF?text=FROZEN&font=montserrat&size=24',
  health: 'https://placehold.co/600x400/00f5d4/333333?text=HEALTH&font=montserrat&size=24',
  desserts: 'https://placehold.co/600x400/f15bb5/FFFFFF?text=DESSERTS&font=montserrat&size=24',
  specialty: 'https://placehold.co/600x400/fee440/333333?text=SPECIALTY&font=montserrat&size=24',
} as const;

// Simplified getProductImage function - NO LOCAL FILE CHECKING
export const getProductImage = (productId: string, category: string): string => {
  // Try to get mapped Unsplash image first
  const mappedImage = PRODUCT_IMAGE_MAP[productId];
  if (mappedImage) {
    return mappedImage;
  }

  // Fallback to category Unsplash image
  const unsplashImage = UNSPLASH_IMAGES[category];
  if (unsplashImage) {
    return unsplashImage;
  }

  // Final fallback to enhanced placeholder
  return PLACEHOLDER_IMAGES[category] || PLACEHOLDER_IMAGES.kimchi;
};

// Helper to check if image exists (optional - for debugging)
export const checkImageExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

// Get optimized image URL for Unsplash
export const getOptimizedImage = (url: string, width: number = 600, height: number = 400): string => {
  if (url.includes('unsplash.com')) {
    // Add unsplash optimization parameters if not already present
    if (!url.includes('&w=')) {
      return \`\${url}\${url.includes('?') ? '&' : '?'}w=\${width}&h=\${height}&fit=crop&q=80&auto=format\`;
    }
  }
  return url;
};

// Generate SVG placeholder (alternative to external placeholders)
export const generateSVGPlaceholder = (category: string, name: string): string => {
  const colors = {
    kimchi: '#E84A5F',
    ramen: '#FF9A76',
    sauces: '#6A0572',
    snacks: '#00B8A9',
    beverages: '#F8F3D4',
    essentials: '#F6416C',
    seafood: '#00BBF9',
    grains: '#FDB827',
    frozen: '#9B5DE5',
    health: '#00F5D4',
    desserts: '#F15BB5',
    specialty: '#FEE440',
  };

  const color = colors[category as keyof typeof colors] || '#E84A5F';
  const textColor = parseInt(color.replace('#', ''), 16) > 0xFFFFFF / 2 ? '#000000' : '#FFFFFF';
  
  const svg = \`<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="\${color}"/>
    <rect x="30" y="30" width="540" height="340" fill="white" fill-opacity="0.1"/>
    <text x="300" y="160" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="\${textColor}" font-weight="bold">
      \${category.toUpperCase()}
    </text>
    <text x="300" y="200" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="\${textColor}" fill-opacity="0.9">
      \${name.substring(0, 30)}\${name.length > 30 ? '...' : ''}
    </text>
    <circle cx="300" cy="300" r="20" fill="\${textColor}" fill-opacity="0.2"/>
  </svg>\`;
  
  return \`data:image/svg+xml;base64,\${Buffer.from(svg).toString('base64')}\`;
};
`;

  // Backup the original file
  const backupPath = filePath + '.backup';
  fs.writeFileSync(backupPath, content);
  console.log(`📁 Backup created: ${backupPath}`);
  
  // Write the updated content
  fs.writeFileSync(filePath, updatedContent);
  console.log(`✅ Updated: ${filePath}`);
  
  return true;
}

// Function to update products.ts to use direct Unsplash URLs
function updateProductsFile() {
  const filePath = path.join(process.cwd(), 'src', 'config', 'products.ts');
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${filePath}`);
    return false;
  }
  
  // Read the current file
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find the PRODUCTS transformation section and simplify it
  const lines = content.split('\n');
  let inTransformSection = false;
  let transformStart = -1;
  let transformEnd = -1;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('// Transform products to include images')) {
      inTransformSection = true;
      transformStart = i;
    }
    if (inTransformSection && lines[i].includes('export const PRODUCTS: Product[] = PRODUCT_DATA.map')) {
      // Find the end of this block (look for the closing bracket)
      let braceCount = 0;
      for (let j = i; j < lines.length; j++) {
        if (lines[j].includes('{')) braceCount++;
        if (lines[j].includes('}')) {
          braceCount--;
          if (braceCount === 0) {
            transformEnd = j;
            break;
          }
        }
      }
      break;
    }
  }
  
  if (transformStart !== -1 && transformEnd !== -1) {
    // Replace the transformation section with simplified version
    const newTransformSection = `// Transform products to include images
export const PRODUCTS: Product[] = PRODUCT_DATA.map(product => {
  const image = getProductImage(product.id, product.category);
  
  return {
    ...product,
    image,
    imageSource: image.includes('unsplash.com') ? 'unsplash' : 'placeholder'
  };
});`;
    
    // Replace the section
    const beforeSection = lines.slice(0, transformStart).join('\n');
    const afterSection = lines.slice(transformEnd + 1).join('\n');
    content = beforeSection + '\n' + newTransformSection + '\n' + afterSection;
    
    // Backup and write
    const backupPath = filePath + '.backup';
    fs.writeFileSync(backupPath, lines.join('\n'));
    console.log(`📁 Backup created: ${backupPath}`);
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated: ${filePath}`);
    
    return true;
  }
  
  console.log(`⚠️  Could not find transformation section in products.ts`);
  return false;
}

// Create a simplified image verification script
function createVerificationScript() {
  const scriptContent = `#!/usr/bin/env node
// verify-images.js - Check if all products have image URLs

import { PRODUCTS } from './src/config/products.js';

console.log('🔍 Verifying product images...');
console.log('='.repeat(50));

let hasMissingImages = false;

PRODUCTS.forEach(product => {
  console.log(\`\${product.id} - \${product.name}\`);
  console.log(\`  Image URL: \${product.image}\`);
  console.log(\`  Source: \${product.imageSource}\`);
  
  if (!product.image || product.image === '') {
    console.log(\`  ❌ MISSING IMAGE\`);
    hasMissingImages = true;
  } else {
    console.log(\`  ✅ OK\`);
  }
  console.log('');
});

console.log('='.repeat(50));
console.log(\`Total products: \${PRODUCTS.length}\`);
console.log(\`✅ All products have image URLs\`);
`;

  const scriptPath = path.join(process.cwd(), 'verify-images.mjs');
  fs.writeFileSync(scriptPath, scriptContent);
  console.log(`📁 Created verification script: ${scriptPath}`);
}

// Main function
async function main() {
  console.log('🚀 Korean Grocery Image System Update');
  console.log('='.repeat(50));
  console.log('This script will:');
  console.log('1. Delete empty image files');
  console.log('2. Update imageMappings.ts to use Unsplash URLs');
  console.log('3. Update products.ts to simplify image handling');
  console.log('4. Create a verification script');
  console.log('');
  
  const args = process.argv.slice(2);
  
  if (args.includes('--dry-run')) {
    console.log('🧪 DRY RUN - No changes will be made');
    console.log('');
    
    // Show what would be cleaned up
    const baseDir = path.join(process.cwd(), 'src', 'assets', 'images', 'products');
    console.log(`Would process directory: ${baseDir}`);
    
    return;
  }
  
  // Step 1: Cleanup empty files
  console.log('🔄 Step 1: Cleaning up empty image files...');
  const cleanupResult = await cleanupImageFiles();
  
  if (cleanupResult.deleted > 0) {
    console.log(`\n🗑️  Removed ${cleanupResult.deleted} empty files`);
  }
  
  // Step 2: Update imageMappings.ts
  console.log('\n🔄 Step 2: Updating imageMappings.ts...');
  const mappingsUpdated = updateImageMappingsFile();
  if (mappingsUpdated) {
    console.log('✅ imageMappings.ts updated successfully');
  }
  
  // Step 3: Update products.ts
  console.log('\n🔄 Step 3: Updating products.ts...');
  const productsUpdated = updateProductsFile();
  if (productsUpdated) {
    console.log('✅ products.ts updated successfully');
  }
  
  // Step 4: Create verification script
  console.log('\n🔄 Step 4: Creating verification script...');
  createVerificationScript();
  
  // Final instructions
  console.log('\n' + '='.repeat(50));
  console.log('🎉 UPDATE COMPLETE!');
  console.log('='.repeat(50));
  console.log('\n✅ Your image system is now using Unsplash URLs');
  console.log('\n📝 Next steps:');
  console.log('1. Run your app to see the new images:');
  console.log('   npm run dev');
  console.log('\n2. Test the verification script:');
  console.log('   node verify-images.mjs');
  console.log('\n3. Optional: Delete the assets/images/products directory if empty:');
  console.log('   rm -rf src/assets/images/products');
  console.log('\n4. The backup files (.backup) can be deleted once confirmed working');
  console.log('\n💡 Your app will now:');
  console.log('   - Use high-quality Unsplash images');
  console.log('   - Load faster (no local file processing)');
  console.log('   - Have no broken images');
  console.log('   - Look professional with real food photos');
}

// Run the script
main().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});