import { ImageGrid } from "@/components/image-grid";
import { FilterDialog } from "@/components/filter-dialog";
import { getPhotos } from "../_actions/photos";

export default async function Home({
  searchParams,
}: {
  searchParams: { tags: string[] | null };
}) {
  const images = await getPhotos(searchParams.tags ? searchParams.tags : null);

  return (
    <section className="container mx-auto mt-4 flex flex-col gap-4 pb-4">
      <div className="flex gap-4 w-full justify-end">
        <FilterDialog />
      </div>
      <ImageGrid images={images}></ImageGrid>
    </section>
  );
}
