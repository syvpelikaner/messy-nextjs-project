import { imageRepository, ImageSchema } from "@/app/db/db";
import { observable } from "@legendapp/state";
import { Subscription } from "dexie";

export const $currentImageId = observable<number | null>(null);
export const $currentImage = observable<ImageSchema | undefined>();

let subscription: Subscription | undefined;

$currentImage.onChange(({ value }) => {
    console.log("currentImage changed", value);
});

$currentImageId.onChange(({ value }) => {
    if (!value) return;

    if (subscription) {
        subscription.unsubscribe();
    }

    const liveQuery = imageRepository.getLive(value);

    subscription = liveQuery.subscribe({
        next: result => $currentImage.set(result)
        ,
        error: error => console.error(error)
    });
});

export async function rotate90(imageData: ImageData) {
    const wasm_module = await import("../../../wasm/pkg/wasm");
    const rotatedImage = wasm_module.rotate_90(imageData.width, imageData.height, new Uint8Array(imageData.data.buffer));

    const rotatedData = new ImageData(
        new Uint8ClampedArray(rotatedImage),
        imageData.height,
        imageData.width
    );

    rotatedData.data.buffer

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    ctx?.clearRect(0, 0, rotatedData.width, rotatedData.height);
    canvas.width = rotatedData.width;
    canvas.height = rotatedData.height;

    ctx?.putImageData(rotatedData, 0, 0);

    const blob = await new Promise<Blob>((res, rej) => {
        canvas.toBlob((value) => {
            if (value === null) return rej(new Error("Failed to create blob"));
            res(value);
        }, "image/png");
    });

    const id = $currentImageId.peek();

    if (id === null) return;

    imageRepository.update({
        id,
        blob,
        updatedAt: Date.now()
    });

    return blob;
}
