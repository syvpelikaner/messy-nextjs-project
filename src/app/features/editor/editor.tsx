"use client";

import { Stage, Layer, Image } from "react-konva";

import { useCurrentImage } from "./hooks/use-current-image";
import Konva from "konva";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { css } from "@styled-system/css";
import { rotate90 } from "./state";

type FilterArray = Array<(typeof Konva.Filters)[keyof typeof Konva.Filters]>;

export function Editor() {
  const image = useCurrentImage();
  const imageRef = useRef<Konva.Image>(null);
  const [blurRadius, setBlurRadius] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState<FilterArray>([]);
  const filters = useMemo(
    () =>
      blurRadius > 0
        ? [...selectedFilters, Konva.Filters.Blur]
        : selectedFilters,
    [blurRadius, selectedFilters]
  );
  const stageRef = useRef<Konva.Stage>(null);
  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.cache();
    }
  }, [image]);

  const handleRotate90 = useCallback(async () => {
    if (!stageRef) return;
    const canvas = stageRef.current?.toCanvas();
    if (!canvas) return;

    const imageData = canvas
      .getContext("2d")
      ?.getImageData(0, 0, canvas.width, canvas.height);
    if (!imageData) return;

    await rotate90(imageData);
  }, [stageRef]);

  return (
    <div className={container}>
      <Stage
        width={image?.width ?? 600}
        height={image?.height ?? 300}
        ref={stageRef}
      >
        <Layer>
          {image !== undefined && (
            <Image
              ref={imageRef}
              image={image}
              filters={filters}
              blurRadius={blurRadius}
            />
          )}
        </Layer>
      </Stage>
      <div className={controlsContainer}>
        <label htmlFor="blur-radius">Blur Radius</label>
        <input
          id="blur-radius"
          type="range"
          min={0}
          max={100}
          value={blurRadius}
          onChange={(e) => setBlurRadius(Number(e.target.value))}
        />
        <label htmlFor="grayscale">Grayscale</label>
        <input
          id="grayscale"
          type="checkbox"
          checked={selectedFilters.includes(Konva.Filters.Grayscale)}
          onChange={(e) =>
            setSelectedFilters(
              e.target.checked ? [Konva.Filters.Grayscale] : []
            )
          }
        />
        <button className={button} onClick={handleRotate90}>
          Rotate 90
        </button>
      </div>
    </div>
  );
}

const container = css({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "row",
});

const controlsContainer = css({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  p: "4",
});

const button = css({
  backgroundColor: "primary",
  color: "white",
  padding: "0.5rem 1rem",
  borderRadius: "0.25rem",
  cursor: "pointer",
});
