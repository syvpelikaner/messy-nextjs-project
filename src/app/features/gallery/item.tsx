import { css } from "@styled-system/css";
import Link from "next/link";
import { useMemo } from "react";
import { ImageSchema } from "../../db/db";

export interface ItemProps extends ImageSchema {}

export function Item({ id, src, alt, blob }: ItemProps) {
  const imageSrc = useMemo(() => {
    if (src) return src;
    if (blob) return URL.createObjectURL(blob);
    return "https://placehold.co/200x300";
  }, [src, image, blob]);
  return (
    <div className={item}>
      <Link href={`/edit/${id}`}>
        <img className={image} src={imageSrc} alt={alt} />
        <div className={overlay}>edit</div>
      </Link>
    </div>
  );
}

const item = css({
  position: "relative",
  overflow: "hidden",
  borderRadius: "md",
  boxShadow: "md",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  _hover: {
    transform: "scale(1.05)",
    boxShadow: "lg",
    cursor: "pointer",
  },
});

const image = css({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const overlay = css({
  position: "absolute",
  top: 0,
  right: 0,
  p: "1",
  opacity: 0,
  width: "100%",
  height: "100%",
  transition: "opacity 0.2s ease-in-out",
  _hover: {
    opacity: 1,
  },
});
