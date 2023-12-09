"use client";
import { ImageType } from "@/types";
import GalleryImage from "./gallery-image";
import { useSearchParams } from "next/navigation";

const MAX_COLUMNS = 4;

export function ImageGrid({ images }: { images: ImageType[] }) {
  function getColumns(colIndex: number) {
    return images.filter((resource, idx) => idx % MAX_COLUMNS === colIndex);
  }

  const tags = useSearchParams().get("tags")?.split(",") || null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {images.length > 0 ? (
        [getColumns(0), getColumns(1), getColumns(2), getColumns(3)].map(
          (column, idx) => (
            <div key={idx} className="flex flex-col gap-4 w-full items-center">
              {column.map((image, idx) => (
                <GalleryImage key={idx} image={image} tags={tags} />
              ))}
            </div>
          )
        )
      ) : (
        <></>
      )}
    </div>
  );
}
