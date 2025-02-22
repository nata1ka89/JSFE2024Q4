import './sources.css';
import { ISources, checkNull } from '../../../types/index';

class Sources {
    public draw(data: ISources[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        if (sourceItemTemp !== null) {
            data.forEach((item) => {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
                const itemName = checkNull(sourceClone.querySelector('.source__item-name'));
                itemName.textContent = item.name;

                const sourceItem = checkNull(sourceClone.querySelector('.source__item'));
                sourceItem.setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            });
        } else {
            throw new Error('Template element #sourceItemTemp not found');
        }
        const sourcesElement = checkNull(document.querySelector('.sources'));
        sourcesElement.append(fragment);
    }
}

export default Sources;
