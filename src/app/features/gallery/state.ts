import { observable, event } from "@legendapp/state";

import { imageRepository, ImageSchema } from "../../db/db";

export const $images = observable<ImageSchema[]>([]);

const subscription = imageRepository.getAllLive().subscribe({
    next: result => $images.set(result),
    error: error => console.error(error)
});

export const galleryMounted = event();

galleryMounted.on(() => {
    imageRepository.getAll().then((images) => {
        $images.set(images);
    });
});

export async function addImage(image: Omit<ImageSchema, "id">) {
    try {
        await imageRepository.add(image);
    } catch (error) {
        console.error(error);
    }
}