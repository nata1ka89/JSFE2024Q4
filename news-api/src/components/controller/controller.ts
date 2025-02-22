import AppLoader from './appLoader';
import { SourcesResponse, ArticleResponse, Callback } from '../../types/index';

class AppController extends AppLoader {
    public getSources(callback: Callback<SourcesResponse>): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: Event, callback: Callback<ArticleResponse>): void {
        const target: EventTarget | null = e.target;
        const newsContainer: EventTarget | null = e.currentTarget;
        if (!target || !newsContainer) throw new Error('EventTarget is null');
        if (!(target instanceof HTMLElement) || !(newsContainer instanceof HTMLElement))
            throw new Error('target or newsContainer is not HTMLElement');
        let elementTarget = target as HTMLElement;
        const elementContainer = newsContainer as HTMLElement;
        while (elementTarget !== elementContainer) {
            if (elementTarget.classList.contains('source__item')) {
                const sourceId = elementTarget.getAttribute('data-source-id');
                if (!sourceId) throw new Error('sourceId is null');
                if (elementContainer.getAttribute('data-source') !== sourceId) {
                    elementContainer.setAttribute('data-source', sourceId);
                    super.getResp<ArticleResponse>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            elementTarget = elementTarget.parentNode as HTMLElement;
        }
    }
}

export default AppController;
