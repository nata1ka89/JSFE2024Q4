import './news.css';
import { Article, checkNull } from '../../../types/index';
class News {
    public draw(data: Article[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
        if (newsItemTemp !== null) {
            news.forEach((item, idx) => {
                const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
                const newsItem = checkNull(newsClone.querySelector('.news__item'));
                if (idx % 2) newsItem.classList.add('alt');
                const metaPhoto = checkNull(newsClone.querySelector('.news__meta-photo'));
                (metaPhoto as HTMLElement).style.backgroundImage =
                    `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                const metaAuthor = checkNull(newsClone.querySelector('.news__meta-author'));
                metaAuthor.textContent = item.author || item.source.name;
                const metaDate = checkNull(newsClone.querySelector('.news__meta-date'));
                metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                const descriptionTitle = checkNull(newsClone.querySelector('.news__description-title'));
                descriptionTitle.textContent = item.title;
                const descriptionSource = checkNull(newsClone.querySelector('.news__description-source'));
                descriptionSource.textContent = item.source.name;
                const descriptionContent = checkNull(newsClone.querySelector('.news__description-content'));
                descriptionContent.textContent = item.description;
                const readMore = checkNull(newsClone.querySelector('.news__read-more a'));
                readMore.setAttribute('href', item.url);
                fragment.append(newsClone);
            });
        } else {
            throw new Error('Template element #newsItemTemp not found');
        }
        const newsElement = checkNull(document.querySelector('.news'));

        newsElement.innerHTML = '';
        newsElement.appendChild(fragment);
    }
}

export default News;
