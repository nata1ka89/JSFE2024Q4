import type { ListComponent } from '../component/options/list-component';

type IListItem = {
  id: string;
  title: string;
  weight: string;
};

type IJsonData = {
  list: IListItem[];
  lastId: number;
};

export function saveOptions(options: IJsonData): void {
  localStorage.clear();
  localStorage.setItem('options', JSON.stringify(options));
}

export function loadOptions(listComponent: ListComponent): IJsonData {
  listComponent.clearList();
  const options = localStorage.getItem('options');

  if (options) {
    const parsedOptions: IJsonData = JSON.parse(options);

    listComponent.displayId = parsedOptions.lastId;
    parsedOptions.list.forEach((item: IListItem) => {
      listComponent.addListItem(item.id, item.title, item.weight);
    });

    return parsedOptions;
  } else {
    throw new TypeError('options is null');
  }
}
