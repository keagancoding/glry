"use client";
import { ImageType } from "@/types";
import GalleryImage from "./gallery-image";

const MAX_COLUMNS = 4;

export function ImageGrid({ images }: { images: ImageType[] }) {
  function getColumns(colIndex: number) {
    return images.filter((resource, idx) => idx % MAX_COLUMNS === colIndex);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {[getColumns(0), getColumns(1), getColumns(2), getColumns(3)].map(
        (column, idx) => (
          <div key={idx} className="flex flex-col gap-4 w-full items-center">
            {column.map((image, idx) => (
              <GalleryImage key={idx} image={image} />
            ))}
          </div>
        )
      )}
    </div>
  );
}
