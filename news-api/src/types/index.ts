export interface Sources {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface AllSources {
    status: string;
    sources: Sources[];
}

export interface Article {
    urlToImage: string;
    author: string;
    source: Pick<Sources, 'name'>;
    publishedAt: string;
    title: string;
    description: string;
    url: string;
}
