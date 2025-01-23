import type { ImageSchema } from "@/app/db/db";

const baseUrl = process.env.BASE_URL;

export async function getRandomImages(): Promise<ImageSchema[]> {
    const response = await fetch(`${baseUrl}/api/images`);
    const data = await response.json();
    return data.images;
}
