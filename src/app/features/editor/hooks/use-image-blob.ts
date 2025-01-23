import { useEffect, useState } from "react";

export function useImageBlob(blob?: Blob) {
    const [image, setImage] = useState<HTMLImageElement | undefined>();

    useEffect(() => {
        if (!blob) return;
        const img = new Image();
        img.src = URL.createObjectURL(blob);
        img.onload = () => {
            setImage(img);
        };
    }, [blob]);

    return image;
}