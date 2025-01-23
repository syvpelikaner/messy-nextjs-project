import { getRandomImages } from "@/images-api";
import { Gallery } from "./features/gallery/gallery";

export default async function Home() {
  const images = await getRandomImages();

  return <Gallery images={images} />;
}
