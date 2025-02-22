enum RequestStatus {
    Ok = 'ok',
    Error = 'error',
}

enum Country {
    AE = 'ae',
    AR = 'ar',
    AT = 'at',
    AU = 'au',
    BE = 'be',
    BG = 'bg',
    BR = 'br',
    CA = 'ca',
    CH = 'ch',
    CN = 'cn',
    CO = 'co',
    CU = 'cu',
    CZ = 'cz',
    DE = 'de',
    EG = 'eg',
    FR = 'fr',
    GB = 'gb',
    GR = 'gr',
    HK = 'hk',
    HU = 'hu',
    ID = 'id',
    IE = 'ie',
    IL = 'il',
    IN = 'in',
    IT = 'it',
    JP = 'jp',
    KR = 'kr',
    LT = 'lt',
    LV = 'lv',
    MA = 'ma',
    MX = 'mx',
    MY = 'my',
    NG = 'ng',
    NL = 'nl',
    NO = 'no',
    NZ = 'nz',
    PH = 'ph',
    PL = 'pl',
    PT = 'pt',
    RO = 'ro',
    RS = 'rs',
    RU = 'ru',
    SA = 'sa',
    SE = 'se',
    SG = 'sg',
    SI = 'si',
    SK = 'sk',
    TH = 'th',
    TR = 'tr',
    TW = 'tw',
    UA = 'ua',
    US = 'us',
    VE = 've',
    ZA = 'za',
}

enum Language {
    AR = 'ar',
    DE = 'de',
    EN = 'en',
    ES = 'es',
    FR = 'fr',
    HE = 'he',
    IT = 'it',
    NL = 'nl',
    NO = 'no',
    PT = 'pt',
    RU = 'ru',
    SE = 'se',
    UD = 'ud',
    ZH = 'zh',
}

enum Category {
    Business = 'business',
    Entertainment = 'entertainment',
    General = 'general',
    Health = 'health',
    Science = 'science',
    Sports = 'sports',
    Technology = 'technology',
}
export interface ISources {
    id: string;
    name: string;
    description: string;
    url: string;
    category: Category;
    language: Language;
    country: Country;
}

export interface SourcesResponse {
    status: RequestStatus;
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
    status: RequestStatus;
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
