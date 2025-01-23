const defaultImages = new Array(10)
    .fill(0)
    .map((_, i) => ({
        id: `image-${i}`,
        src: `https://picsum.photos/id/${i + 50}/200/300`,
        alt: `Random image from picsum: ${i + 50}`,
    }));

export async function GET() {
    return Response.json({ images: defaultImages });
}
