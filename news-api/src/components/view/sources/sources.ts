import './sources.css';
import { ISources } from '../../../types/index';

class Sources {
    draw(data: ISources[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        if (sourceItemTemp !== null) {
            data.forEach((item) => {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
                const itemName = sourceClone.querySelector('.source__item-name');
                if (itemName === null) throw new Error('element is null');
                itemName.textContent = item.name;

                const sourceItem = sourceClone.querySelector('.source__item');
                if (sourceItem === null) throw new Error('element is null');
                sourceItem.setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            });
        } else {
            throw new Error('Template element #sourceItemTemp not found');
        }
        const sourcesElement = document.querySelector('.sources');
        if (sourcesElement === null) throw new Error('element is null');
        sourcesElement.append(fragment);
    }
}

export default Sources;
