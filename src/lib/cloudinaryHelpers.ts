// src/lib/cloudinaryHelpers.ts
import { cld } from "./cloudinary";
import { fill, scale } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";
import { auto as autoFormat } from "@cloudinary/url-gen/qualifiers/format";

export function getOptimizedProductImage(
  publicId: string, 
  options: { width?: number; aspectRatio?: number | string; cropMode?: 'fill' | 'scale' } = {}
) {
  const { width = 600, aspectRatio, cropMode = 'fill' } = options;

  const image = cld.image(publicId);

  // Choose crop mode
  const resizeAction = cropMode === 'fill' ? fill() : scale();

  resizeAction.width(width);
  if (aspectRatio) resizeAction.aspectRatio(aspectRatio);
  resizeAction.gravity(autoGravity());

  image.resize(resizeAction);

  // Always optimize
  image.delivery(quality(auto()));
  image.delivery(format(autoFormat()));

  return image.toURL();
}

// Usage in component or your mapping:
const kimchiImage = getOptimizedProductImage("products/kimchi/aged-kimchi", {
  width: 433,
  aspectRatio: "0.5",          // or 9/16 for stories, etc.
  cropMode: "fill"
});