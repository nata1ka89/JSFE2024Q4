import type { ListItem } from '../../utils/data-structure';

export class viewSections {
  private node: HTMLCanvasElement;
  constructor(node: HTMLCanvasElement) {
    this.node = node;
    this.draw();
  }
  private static getOptions(): { title: string; weight: number }[] | undefined {
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

  private static getTotalWeight(): number | undefined {
    const arrayWeight = viewSections.getOptions();
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

  private draw(): void {
    const options = viewSections.getOptions();
    const totalWeight = viewSections.getTotalWeight();
    let startAngle = 0;
    if (options && totalWeight) {
      options.forEach((item) => {
        const sliceAngle = (item.weight * Math.PI * 2) / totalWeight;
        if (this.node instanceof HTMLCanvasElement) {
          const centerX = this.node.width / 2;
          const centerY = this.node.height / 2;
          const radius = this.node.height / 2;
          const radiusCenter = (this.node.height * 13) / 100 / 2;
          const context = this.node.getContext('2d');
          if (context) {
            context.beginPath();
            context.moveTo(centerX, centerY);
            context.arc(centerX, centerY, radius, startAngle, sliceAngle + startAngle);
            context.closePath();
            const color = Object.values(viewSections.randomColor()).join(',');
            context.fillStyle = `rgb(${color})`;
            context.fill();
            context.strokeStyle = 'white';
            context.lineWidth = 2;
            context.stroke();

            const middleAngle = startAngle + sliceAngle / 2;
            const sectionWidth = sliceAngle * radius - 10; // Section width
            const maxTextWidth = radius - radiusCenter; // Max text width
            // add text
            if (sectionWidth > 30) {
              context.save();
              context.translate(centerX, centerY);
              context.rotate(middleAngle);
              context.textAlign = 'center';
              context.textBaseline = 'middle';
              context.font = '16px Arial';
              context.fillStyle = 'white';
              context.strokeStyle = 'black';
              context.lineWidth = 3;

              const textWidth = context.measureText(item.title).width; //length text
              //Trim text if it is long
              if (textWidth > maxTextWidth) {
                item.title = viewSections.clipText(context, item.title, maxTextWidth);
              }
              context.strokeText(item.title, (radius + radiusCenter) / 2, 0);
              context.fillText(item.title, (radius + radiusCenter) / 2, 0);
              context.restore();
              startAngle += sliceAngle;
            }
          }
        } else {
          throw new TypeError('canvas-unsupported code here');
        }
      });
    }
  }
}
