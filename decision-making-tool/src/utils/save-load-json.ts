import type { ListComponent } from "../component/options/list-component";
import type { JsonData, ListItem } from "./data-structure";

export function createURL(optionsSave: JsonData): void {
  const blob = new Blob([JSON.stringify(optionsSave, null, 2)], {
    type: 'application/json',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'list-options.json';
  link.click();

  URL.revokeObjectURL(url);
}

export function loadJson(listComponent: ListComponent): void {

  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';

  input.addEventListener('change', () => {
    const file = input.files?.[0];
    if (file) {
      file.text().then((text) => {
        try {
          listComponent.clearList();
          const jsonData: unknown = JSON.parse(text);
          if (jsonData && typeof jsonData === "object" && "list" in jsonData &&
            "lastId" in jsonData && Array.isArray(jsonData.list) && typeof jsonData.lastId === "number") {
            listComponent.displayId = jsonData.lastId;
            jsonData.list.forEach((item: ListItem) => {
              listComponent.addListItem(item.id, item.title, item.weight);
            });
          }
        } catch {
          throw new TypeError('Error parsing JSON file');
        }
      })
        .catch(() => {
          throw new TypeError('Error reading file');
        });
    }
  })
  input.click();
}