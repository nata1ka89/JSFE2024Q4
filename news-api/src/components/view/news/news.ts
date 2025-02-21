import './news.css';
import { Article } from '../../../types/index';
class News {
    public draw(data: Article[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
        if (newsItemTemp !== null) {
            news.forEach((item, idx) => {
                const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
                const newsItem = newsClone.querySelector('.news__item');
                if (newsItem === null) throw new Error('element is null');
                if (idx % 2) newsItem.classList.add('alt');
                const metaPhoto = newsClone.querySelector('.news__meta-photo');
                if (metaPhoto === null) throw new Error('element is null');
                (metaPhoto as HTMLElement).style.backgroundImage =
                    `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                const metaAuthor = newsClone.querySelector('.news__meta-author');
                if (metaAuthor === null) throw new Error('element is null');
                metaAuthor.textContent = item.author || item.source.name;
                const metaDate = newsClone.querySelector('.news__meta-date');
                if (metaDate === null) throw new Error('element is null');
                metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                const descriptionTitle = newsClone.querySelector('.news__description-title');
                if (descriptionTitle === null) throw new Error('element is null');
                descriptionTitle.textContent = item.title;
                const descriptionSource = newsClone.querySelector('.news__description-source');
                if (descriptionSource === null) throw new Error('element is null');
                descriptionSource.textContent = item.source.name;
                const descriptionContent = newsClone.querySelector('.news__description-content');
                if (descriptionContent === null) throw new Error('element is null');
                descriptionContent.textContent = item.description;
                const readMore = newsClone.querySelector('.news__read-more a');
                if (readMore === null) throw new Error('element is null');
                readMore.setAttribute('href', item.url);
                fragment.append(newsClone);
            });
        } else {
            throw new Error('Template element #newsItemTemp not found');
        }
        const newsElement = document.querySelector('.news');
        if (newsElement === null) throw new Error('element is null');

        newsElement.innerHTML = '';
        newsElement.appendChild(fragment);
    }
}

export default News;
