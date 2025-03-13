import type { ListComponent } from '../component/options/list-component';
import type { JsonData, ListItem } from './data-structure';

export function saveOptions(options: JsonData): void {
  localStorage.clear();
  localStorage.setItem('options', JSON.stringify(options));
}

export function loadOptions(listComponent: ListComponent): JsonData {
  listComponent.clearList();
  const options = localStorage.getItem('options');

  if (options) {
    const parsedOptions: JsonData = JSON.parse(options);

    listComponent.displayId = parsedOptions.lastId;
    parsedOptions.list.forEach((item: ListItem) => {
      listComponent.addListItem(item.id, item.title, item.weight);
    });

    return parsedOptions;
  } else {
    throw new TypeError('options is null');
  }
}
