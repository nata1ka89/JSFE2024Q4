export interface ISources {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface SourcesResponse {
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

export interface ArticleResponse {
    status: string;
    totalResults: bigint;
    articles: Article[];
}

export function checkNull(element: HTMLElement | null): HTMLElement {
    if (element === null) throw new Error('element is null');
    return element;
}

export interface Options {
    [key: string]: string;
}

export interface RequestParameters {
    endpoint: string;
    options?: Options;
}

export type Callback<T> = (data: T) => void;
