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

export interface ArticleSource {
    id: string;
    name: string;
}

export interface Article {
    source: ArticleSource;
    urlToImage?: string;
    author?: string;
    publishedAt: string;
    title: string;
    description: string;
    url: string;
    content?: string;
}
