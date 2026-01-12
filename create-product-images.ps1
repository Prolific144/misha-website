# create-product-images.ps1
$ErrorActionPreference = "Stop"

Write-Host "Creating Korean grocery product image structure..." -ForegroundColor Cyan
Write-Host "=================================================="

# Base directory
$baseDir = "src/assets/images/products"

# Categories
$categories = @(
    "kimchi", "ramen", "sauces", "snacks", "beverages",
    "essentials", "seafood", "grains", "frozen",
    "health", "desserts", "specialty"
)

# Specific images per category
$productImages = @{
    kimchi = @(
        "aged-kimchi.jpg",
        "radish-kimchi.jpg",
        "small-kimchi.jpg",
        "white-kimchi.jpg",
        "cucumber-kimchi.jpg",
        "water-kimchi.jpg",
        "spring-onion-kimchi.jpg",
        "mustard-kimchi.jpg",
        "wrapped-kimchi.jpg",
        "nabak-kimchi.jpg"
    )
    ramen = @(
        "shin-ramyun.jpg",
        "jin-ramyun.jpg",
        "buldak-ramen.jpg",
        "neoguri-ramen.jpg",
        "bibim-men.jpg",
        "ottogi-ramen.jpg",
        "cheese-buldak-ramen.jpg",
        "chapagetti.jpg",
        "buldak-mild.jpg"
    )
    sauces = @(
        "gochujang.jpg",
        "doenjang.jpg",
        "ssamjang.jpg",
        "soy-sauce.jpg",
        "sesame-oil.jpg",
        "gochugaru.jpg",
        "bibimbap-sauce.jpg",
        "bulgogi-marinade.jpg",
        "yakult-gochujang.jpg",
        "perilla-oil.jpg"
    )
    snacks = @(
        "choco-pie.jpg",
        "honey-butter-chips.jpg",
        "shrimp-crackers.jpg",
        "pepero.jpg",
        "cheetos.jpg"
    )
    beverages = @(
        "makkoli.jpg",
        "soju.jpg",
        "cass-beer.jpg"
    )
    essentials = @(
        "rice-cake.jpg",
        "glass-noodles.jpg",
        "pancake-mix.jpg"
    )
    seafood = @(
        "anchovies.jpg",
        "seaweed.jpg",
        "dried-squid.jpg"
    )
    grains = @(
        "rice.jpg",
        "mixed-grains.jpg",
        "sweet-potato-noodles.jpg"
    )
    frozen = @(
        "dumplings.jpg",
        "tteokbokki-set.jpg",
        "pajeon.jpg"
    )
    health = @(
        "red-ginseng.jpg",
        "barley-tea.jpg",
        "omija-tea.jpg"
    )
    desserts = @(
        "songpyeon.jpg",
        "hotteok-mix.jpg",
        "patbingsoo.jpg"
    )
    specialty = @(
        "royal-cuisine.jpg",
        "bbq-set.jpg",
        "tea-ceremony.jpg"
    )
}

$totalCreated = 0
$totalSkipped = 0

foreach ($category in $categories) {
    $categoryDir = "$baseDir/$category"
    
    # Create directory
    if (-not (Test-Path $categoryDir)) {
        New-Item -ItemType Directory -Path $categoryDir -Force | Out-Null
        Write-Host "Created directory: $categoryDir" -ForegroundColor Green
    } else {
        Write-Host "Directory exists: $categoryDir" -ForegroundColor Yellow
    }
    
    # Create default.jpg
    $defaultImage = "$categoryDir/default.jpg"
    if (-not (Test-Path $defaultImage)) {
        # Create empty file
        New-Item -ItemType File -Path $defaultImage -Force | Out-Null
        Write-Host "  Created: default.jpg" -ForegroundColor Gray
        $totalCreated++
    } else {
        Write-Host "  Skipped: default.jpg (already exists)" -ForegroundColor DarkGray
        $totalSkipped++
    }
    
    # Create specific product images
    if ($productImages.ContainsKey($category)) {
        foreach ($imageName in $productImages[$category]) {
            $imagePath = "$categoryDir/$imageName"
            
            if (-not (Test-Path $imagePath)) {
                # Create empty file
                New-Item -ItemType File -Path $imagePath -Force | Out-Null
                Write-Host "  Created: $imageName" -ForegroundColor Gray
                $totalCreated++
            } else {
                Write-Host "  Skipped: $imageName (already exists)" -ForegroundColor DarkGray
                $totalSkipped++
            }
        }
    }
    
    Write-Host ""
}

# Summary
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "SUMMARY" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Total categories: $($categories.Count)" -ForegroundColor White
Write-Host "Total images created: $totalCreated" -ForegroundColor Green
Write-Host "Total images skipped: $totalSkipped" -ForegroundColor Yellow
Write-Host "Total images expected: 73" -ForegroundColor White
Write-Host ""

# Instructions
Write-Host "NEXT STEPS:" -ForegroundColor Magenta
Write-Host "1. Replace empty .jpg files with actual product photos" -ForegroundColor White
Write-Host "2. Recommended image size: 600x400 pixels" -ForegroundColor White
Write-Host "3. Use tools like GIMP, Photoshop, or online converters" -ForegroundColor White
Write-Host ""
Write-Host "The application will work with these empty files," -ForegroundColor White
Write-Host "but will show Unsplash images as fallbacks." -ForegroundColor White