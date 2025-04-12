import { ERROR_ELEMENT_NULL } from './constants';

export function checkNull(element: HTMLElement | null): HTMLElement {
  if (element === null) throw new Error(ERROR_ELEMENT_NULL);
  return element;
}
