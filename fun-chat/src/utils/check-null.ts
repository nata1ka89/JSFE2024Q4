export function checkNull(element: HTMLElement | null): HTMLElement {
  if (element === null) throw new Error('element is null');
  return element;
}
