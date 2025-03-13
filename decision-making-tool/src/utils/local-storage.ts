import type { ListComponent } from '../component/options/list-component';
import type { JsonData, ListItem } from './data-structure';

export function saveOptions(options: JsonData): void {
  localStorage.clear();
  localStorage.setItem('options', JSON.stringify(options));
}

export function loadOptions(listComponent: ListComponent): void {
  listComponent.clearList();
  const options = localStorage.getItem('options');

  if (options) {

    const parsedOptions: unknown = JSON.parse(options);
    if (parsedOptions && typeof parsedOptions === "object" && "list" in parsedOptions &&
      "lastId" in parsedOptions && Array.isArray(parsedOptions.list) && typeof parsedOptions.lastId === "number") {
      listComponent.displayId = parsedOptions.lastId;
      parsedOptions.list.forEach((item: ListItem) => {
        listComponent.addListItem(item.id, item.title, item.weight);
      });
    }
  } else {
    throw new TypeError('options is null');
  }
}
