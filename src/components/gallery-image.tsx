import { ImageType } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function GalleryImage({
  image,
  tags,
}: {
  image: ImageType;
  tags: string[] | null;
}) {
  return (
    <Link href={`/p${image.src}${tags ? `?tags=${tags.join(",")}` : ''}`}>
      <Image
        src={image.src}
        alt=""
        width={350}
        height={350}
        className="rounded-md"
      />
    </Link>
  );
}
