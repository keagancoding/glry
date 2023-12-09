import { ImageType } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function GalleryImage({ image }: { image: ImageType }) {
  return (
    <Link href={image?.href ?? ""}>
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
