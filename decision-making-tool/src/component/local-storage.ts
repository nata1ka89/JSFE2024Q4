export function saveOptions(
  options: { id: string; title: string; weight: string }[]
): void {
  localStorage.clear();
  localStorage.setItem('options', JSON.stringify(options));
}

/*export function loadOptions(): { id: string; title: string; weight: string }[] {
  const options = localStorage.getItem('options');
  if (options !== null) {
    const parsedOptions = JSON.parse(options);
    if (
      Array.isArray(parsedOptions) &&
      parsedOptions.every(
        (option) =>
          option &&
          typeof option === 'object' &&
          typeof option.id === 'string' &&
          typeof option.title === 'string' &&
          typeof option.weight === 'string'
      )
    )
    console.log(parsedOptions);
    return parsedOptions;
  }
  throw new TypeError('Invalid options structure');
}*/
