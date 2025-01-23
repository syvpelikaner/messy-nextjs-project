import { useParams } from "next/navigation";
import { $currentImage } from "../state";
import { $currentImageId } from "../state";
import { useEffect } from "react";
import { use$ } from "@legendapp/state/react";
import { useImageBlob } from "./use-image-blob";

export function useCurrentImage() {
    const params = useParams<{ id: string }>();
    const currentImage = use$($currentImage);

    console.log("currentImage", currentImage);

    useEffect(() => {
        const id = params.id;
        $currentImageId.set(Number(id));
    }, [params.id]);

    const image = useImageBlob(currentImage?.blob);

    return image;
}
