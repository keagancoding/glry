"use server";
import photoData from "@/data/photos.json";
type tags = string[] | null;

export const getPhotos = async (tags: tags) => {
  // fake timeout
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (tags) {
    return photoData.photos.filter((photo) =>
      photo.tags.some((tag) => tags.includes(tag))
    );
  } else {
    return photoData.photos;
  }
};
