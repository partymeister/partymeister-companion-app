export interface Entry {
    id: number;
    title: string;
    author: string;
    competition: string;
    description: string;
    screenshot: Image;
    preview: Image;
    options: string[];
    uploader_data: {};
    composer_data: {};
}

export interface Image{
    id: number;
    url: string;
}