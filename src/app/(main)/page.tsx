import fs from "fs";
import { ImageGrid } from "@/components/image-grid";
import { FilterDialog } from "@/components/filter-dialog";
import { baseUrl } from "@/config";

export default function Home() {
  const images = fs.readdirSync(baseUrl);
  const formattedImages = images.map((image) => {
    return {
      src: `/${image}`,
      href: `/image/${image}`,
      tags: ["image"],
    };
  });

  return (
    <section className="container mx-auto mt-4 flex flex-col gap-4">
      <div className="flex gap-4 w-full justify-end">
        <FilterDialog />
      </div>
      <ImageGrid images={formattedImages}></ImageGrid>
    </section>
  );
}
