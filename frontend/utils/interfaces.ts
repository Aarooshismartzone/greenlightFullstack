export interface blogInterface {
    _id: string;  // MongoDB ObjectId as a string
    title: string;
    slug: string;
    content: string;
    keywords: string;
    image: string;
    readtime: number;
    createdAt: string;  // ISO timestamp (e.g., "2024-03-24T12:34:56.789Z")
}

export interface BlogPost { //for the frontend
    _id: string;
    title: string;
    slug: string;
    content: string;
    keywords: string;
    image: string;
    readtime: number;
    createdAt: string;
    year: number;
    month: string;
    date: number;
}

export interface GalleryItem {
    _id: string;
    image_path: string;
    alt_tag: string;
}