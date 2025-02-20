import './sources.css';
import { ISources } from '../../../types/index';

class Sources {
    draw(data: ISources[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        if (sourceItemTemp !== null) {
            data.forEach((item) => {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

                (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
                sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            });
        } else {
            throw new Error('Template element #newsItemTemp not found');
        }
        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
