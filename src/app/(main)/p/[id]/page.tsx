import { baseUrl } from "@/config";
import Image from "next/image";
import fs from "fs";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ExpandIcon, XIcon } from "lucide-react";
import { getPhotos } from "@/app/_actions/photos";
import { notFound } from "next/navigation";

export default async function PhotoPage({
  params: { id },
  searchParams: { tags },
}: {
  params: { id: string };
  searchParams: { tags: string[] | null };
}) {
  const images = await getPhotos(tags ? tags : null);

  const photo = images.find((photo) => photo.src === `/${id}`);
  if (!photo) return notFound();

  const prevThreePhotos = images
    .slice(0, images.indexOf(photo))
    .slice(-3)
    .map((photo) => photo.src);

  const nextThreePhotos = images
    .slice(images.indexOf(photo) + 1)
    .slice(0, 3)
    .map((photo) => photo.src);

  return (
    <div className="py-5 px-1">
      <div className="max-w-xl mx-auto relative">
        <Image
          alt=""
          src={photo.src}
          height={600}
          width={1000}
          className="w-full object-cover col-span-2 mb-2 relative rounded-md"
        />
        <div className="flex item-center py-2 px-2 absolute top-0 w-full justify-between">
          <Link
            href={`/${tags ? "?tags=" + tags : ""}`}
            className="grid place-content-center shrink-0 p-2 bg-background/50 backdrop-blur rounded-full aspect-square"
          >
            <XIcon className="w-5 h-5" />
          </Link>
          <Link
            href={photo.src}
            className="grid place-content-center shrink-0 p-2 bg-background/50 backdrop-blur rounded-full aspect-square"
          >
            <ExpandIcon className="w-5 h-5" />
          </Link>
        </div>
        <div className="flex item-center py-2 px-2 absolute bottom-20 w-full justify-center gap-2">
          <Link
            href={`/p${prevThreePhotos[0]}${tags ? "?tags=" + tags : ""}`}
            className="grid place-content-center shrink-0 p-2 bg-background/50 backdrop-blur rounded-full aspect-square"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <Link
            href={`/p${nextThreePhotos[0]}${tags ? "?tags=" + tags : ""}`}
            className="grid place-content-center shrink-0 p-2 bg-background/50 backdrop-blur rounded-full aspect-square"
          >
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="flex gap-2 justify-center">
          {prevThreePhotos.map((photo) => (
            <Link
              href={`/p${photo}${tags ? "?tags=" + tags : ""}`}
              key={photo}
              className="w-[75px] aspect-square relative overflow-hidden"
            >
              <Image
                alt=""
                src={`${photo}`}
                height={200}
                width={200}
                className="object-cover opacity-50 w-full h-full rounded-md"
              />
            </Link>
          ))}
          <div className="w-[75px] aspect-square relative overflow-hidden">
            <Image
              alt=""
              src={photo.src}
              height={200}
              width={200}
              className="object-cover w-full h-full rounded-md"
            />
          </div>
          {nextThreePhotos.map((photo) => (
            <Link
              href={`/p${photo}${tags ? "?tags=" + tags : ""}`}
              key={photo}
              className="w-[75px] aspect-square relative overflow-hidden"
            >
              <Image
                alt=""
                src={`${photo}`}
                height={200}
                width={200}
                className="object-cover opacity-50 w-full h-full rounded-md"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
