"use client";

import { css } from "@styled-system/css";
import type { ImageSchema } from "../../db/db";
import { Item } from "./item";
import { useEffect } from "react";
import { $images, galleryMounted } from "./state";
import { use$ } from "@legendapp/state/react";
import { ImageInput } from "./image-input";

export interface GalleryProps {
  images?: ImageSchema[];
}

export function Gallery({ images = [] }: GalleryProps) {
  const allImages = use$($images);

  useEffect(() => {
    galleryMounted.fire();
  }, []);

  return (
    <div className={container}>
      <ImageInput />
      {allImages.concat(images).map(({ id, src, alt, blob }) => (
        <Item key={id} id={id} src={src} alt={alt} blob={blob} />
      ))}
    </div>
  );
}

const container = css({
  display: "grid",
  gridTemplateColumns: {
    base: "repeat(1, 1fr)",
    sm: "repeat(2, 1fr)",
    md: "repeat(3, 1fr)",
    lg: "repeat(4, 1fr)",
  },
  gap: "4",
  p: "4",
});
