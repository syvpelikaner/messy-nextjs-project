import Dexie, { type EntityTable, liveQuery } from "dexie";

export interface ImageSchema {
    id: number;
    src?: string;
    alt: string;
    blob?: Blob;
    updatedAt?: number;
}

export type DB = Dexie & { images: EntityTable<ImageSchema, "id"> };

const db = new Dexie("editor") as DB;

db.version(3).stores({
    images: "++id, src, alt, blob, updatedAt",
});


export class ImageRepository {
    constructor(private db: DB) { }

    async getAll() {
        return this.db.images.toArray();
    }

    async get(id: number) {
        return this.db.images.get(id);
    }

    async add(image: ImageSchema) {
        return this.db.images.add(image);
    }

    async update(image: Partial<ImageSchema>) {
        const id = image.id;
        if (!id) return;

        return this.db.images.update(id, image);
    }

    getLive(id: number) {
        return liveQuery(() => this.get(id));
    }

    getAllLive() {
        return liveQuery(() => this.getAll());
    }
}

export const imageRepository = new ImageRepository(db);
