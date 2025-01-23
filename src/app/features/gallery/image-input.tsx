"use client";

import { css } from "@styled-system/css";
import { useRef } from "react";
import { addImage } from "./state";

export function ImageInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const arrayBuffer = reader.result;
      if (!arrayBuffer) return;
      const blob = new Blob([arrayBuffer], { type: file.type });
      addImage({
        src: undefined,
        alt: file.name,
        blob,
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={container} onClick={handleClick}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className={input}
      />
      Click to add image
    </div>
  );
}

const container = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

const input = css({
  display: "none",
});
