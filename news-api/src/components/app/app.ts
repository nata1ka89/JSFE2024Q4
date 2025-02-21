import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { SourcesResponse, ArticleResponse } from '../../types/index';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sourcesContainer = document.querySelector('.sources');
        if (!sourcesContainer) throw new Error('.sources not found');
        sourcesContainer.addEventListener('click', (e: Event) =>
            this.controller.getNews(e, (data: ArticleResponse) => this.view.drawNews(data))
        );
        this.controller.getSources((data: SourcesResponse) => this.view.drawSources(data));
    }
}

export default App;
