// src/lib/cloudinary.ts
import { Cloudinary } from "@cloudinary/url-gen";

export const cld = new Cloudinary({
  cloud: {
    cloudName: "Snooganalytics" // ← from your Cloudinary dashboard
  }
});