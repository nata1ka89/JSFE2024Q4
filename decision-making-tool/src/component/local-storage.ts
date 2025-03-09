export function saveOptions(
  options: { id: string; title: string; weight: string }[]
): void {
  localStorage.clear();
  localStorage.setItem('options', JSON.stringify(options));
}