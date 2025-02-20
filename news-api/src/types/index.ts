export interface ISources {
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
    sources: ISources[];
}

export interface Article {
    urlToImage: string;
    author: string;
    source: Pick<ISources, 'name'>;
    publishedAt: string;
    title: string;
    description: string;
    url: string;
}
