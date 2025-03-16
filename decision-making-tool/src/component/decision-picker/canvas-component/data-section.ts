import type { ListItem } from '../../../utils/data-structure';

export class DataSections {
  constructor() {}
  public static getOptions(): { title: string; weight: number }[] | undefined {
    const options = localStorage.getItem('options');
    if (options) {
      const parsedOptions: unknown = JSON.parse(options);
      if (
        parsedOptions &&
        typeof parsedOptions === 'object' &&
        'list' in parsedOptions &&
        'lastId' in parsedOptions &&
        Array.isArray(parsedOptions.list) &&
        typeof parsedOptions.lastId === 'number'
      ) {
        const list = parsedOptions.list
          .filter((item: ListItem) => item.weight && item.weight !== '')
          .map((item: ListItem) => ({
            title: item.title,
            weight: Number(item.weight),
          }));
        return list;
      }
    } else {
      throw new TypeError('options is undefined');
    }
  }

  public static getTotalWeight(): number | undefined {
    const arrayWeight = this.getOptions();
    if (arrayWeight) {
      const totalWeight = arrayWeight.reduce((acc, current) => {
        acc += current.weight;
        return acc;
      }, 0);
      return totalWeight;
    }
  }

  private static randomColor(): object {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return { r, g, b };
  }

  private static generateSectionColors(): string[] {
    const options = DataSections.getOptions();
    let sectionColors: string[] = [];
    if (options) {
      sectionColors = options.map(() => {
        const color = Object.values(DataSections.randomColor()).join(',');
        return `rgb(${color})`;
      });
      return sectionColors;
    } else {
      throw new TypeError('option is undefined');
    }
  }

  private static clipText(
    context: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
  ): string {
    let clippedText = text + '…';
    while (context.measureText(clippedText).width > maxWidth) {
      clippedText = clippedText.slice(0, -4) + '…';
    }
    return clippedText;
  }
}
