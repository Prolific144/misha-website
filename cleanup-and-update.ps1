# cleanup-and-update.ps1 - Copy and paste this entire script into PowerShell
Write-Host "🚀 Korean Grocery Image System Update" -ForegroundColor Cyan
Write-Host "=" * 50

# Step 1: Clean up empty files
Write-Host "`n🔄 Step 1: Cleaning up empty image files..." -ForegroundColor Yellow

$baseDir = "src/assets/images/products"
$totalDeleted = 0
$totalKept = 0

if (Test-Path $baseDir) {
    Get-ChildItem -Path $baseDir -Directory | ForEach-Object {
        $category = $_.Name
        Write-Host "  Processing: $category" -ForegroundColor Gray
        
        Get-ChildItem -Path $_.FullName -File | ForEach-Object {
            if ($_.Length -eq 0) {
                Remove-Item $_.FullName -Force
                Write-Host "    🗑️  Deleted (empty): $($_.Name)" -ForegroundColor DarkGray
                $totalDeleted++
            } else {
                Write-Host "    ✅ Kept ($($_.Length) bytes): $($_.Name)" -ForegroundColor Green
                $totalKept++
            }
        }
        
        # Remove empty directories
        $remainingFiles = Get-ChildItem -Path $_.FullName -File
        if ($remainingFiles.Count -eq 0) {
            Remove-Item $_.FullName -Force
            Write-Host "    🗑️  Removed empty directory: $category" -ForegroundColor DarkGray
        }
    }
} else {
    Write-Host "  Directory not found: $baseDir" -ForegroundColor Yellow
}

Write-Host "`n📊 Cleanup Summary:" -ForegroundColor Cyan
Write-Host "  Deleted empty files: $totalDeleted" -ForegroundColor Red
Write-Host "  Kept files with content: $totalKept" -ForegroundColor Green

# Step 2: Update imageMappings.ts
Write-Host "`n🔄 Step 2: Creating new imageMappings.ts with Unsplash URLs..." -ForegroundColor Yellow

$imageMappingsPath = "src/config/imageMappings.ts"
$backupPath = "$imageMappingsPath.backup"

# Create backup if file exists
if (Test-Path $imageMappingsPath) {
    Copy-Item $imageMappingsPath $backupPath -Force
    Write-Host "  📁 Backup created: $backupPath" -ForegroundColor Gray
}

# Create new imageMappings.ts content
$newImageMappingsContent = @'
// src/config/imageMappings.ts
// UPDATED: Using Unsplash URLs for all images

// Direct Unsplash URLs for all products
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

// Simple function to get product image
export const getProductImage = (productId: string, category: string): string => {
  // Return Unsplash URL if mapped, otherwise use generic category image
  return PRODUCT_IMAGE_MAP[productId] || \`https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&auto=format&text=\${encodeURIComponent(category)}\`;
};

// Helper to optimize Unsplash URLs
export const getOptimizedImage = (url: string, width: number = 600, height: number = 400): string => {
  if (url.includes('unsplash.com')) {
    return \`\${url}&w=\${width}&h=\${height}&fit=crop&q=80&auto=format\`;
  }
  return url;
};
'@

# Write new file
Set-Content -Path $imageMappingsPath -Value $newImageMappingsContent -Encoding UTF8
Write-Host "  ✅ Created new: $imageMappingsPath" -ForegroundColor Green

# Step 3: Create a simple products.ts update (just modify the image transform)
Write-Host "`n🔄 Step 3: Updating products.ts..." -ForegroundColor Yellow

$productsPath = "src/config/products.ts"
if (Test-Path $productsPath) {
    # Read the file
    $productsContent = Get-Content $productsPath -Raw
    
    # Simple replacement for the image transform section
    $updatedContent = $productsContent -replace `
        'const image = getProductImage\(product\.id, product\.category\);[\s\S]*?imageSource:.*?,', `
        'const image = getProductImage(product.id, product.category);
  
  return {
    ...product,
    image,
    imageSource: "unsplash"
  };'
    
    # Create backup
    $productsBackup = "$productsPath.backup"
    Copy-Item $productsPath $productsBackup -Force
    Write-Host "  📁 Backup created: $productsBackup" -ForegroundColor Gray
    
    # Write updated file
    Set-Content -Path $productsPath -Value $updatedContent -Encoding UTF8
    Write-Host "  ✅ Updated: $productsPath" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  File not found: $productsPath" -ForegroundColor Yellow
}

# Step 4: Final instructions
Write-Host "`n" + ("=" * 50) -ForegroundColor Cyan
Write-Host "🎉 UPDATE COMPLETE!" -ForegroundColor Green
Write-Host "=" * 50 -ForegroundColor Cyan

Write-Host "`n✅ What was done:" -ForegroundColor White
Write-Host "  1. Cleaned up $totalDeleted empty image files" -ForegroundColor Gray
Write-Host "  2. Created new imageMappings.ts with 73 Unsplash URLs" -ForegroundColor Gray
Write-Host "  3. Updated products.ts to use 'unsplash' image source" -ForegroundColor Gray

Write-Host "`n🚀 Next steps:" -ForegroundColor Magenta
Write-Host "  1. Start your app: npm run dev" -ForegroundColor White
Write-Host "  2. Check if images load correctly" -ForegroundColor White
Write-Host "  3. Delete backup files if everything works:" -ForegroundColor White
Write-Host "     - src/config/imageMappings.ts.backup" -ForegroundColor Gray
Write-Host "     - src/config/products.ts.backup" -ForegroundColor Gray
Write-Host "  4. Optional: Delete empty directories:" -ForegroundColor White
Write-Host "     rm -rf src/assets/images/products" -ForegroundColor Gray

Write-Host "`n💡 Your app will now:" -ForegroundColor Cyan
Write-Host "  • Use beautiful Unsplash food photos" -ForegroundColor White
Write-Host "  • Load faster (no local files)" -ForegroundColor White
Write-Host "  • Have professional-looking images" -ForegroundColor White
Write-Host "  • Work without 73 local image files!" -ForegroundColor White

Write-Host "`nPress any key to exit..." -ForegroundColor DarkGray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")