export function createURL(optionsSave: object): void {
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
