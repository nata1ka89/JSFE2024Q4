import { BaseComponent } from '../../utils/base-component';
import type { ListItem } from '../../utils/data-structure';

export class canvasComponent extends BaseComponent {
  constructor(_parenNode: HTMLElement | null) {
    super(_parenNode, 'canvas', 'wheel-canvas');
    this.createWheelCanvas();
    this.draw();
  }

  private static getOptions(): number[] | undefined {
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
        const arrayWeight = parsedOptions.list
          .filter((item: ListItem) => item.weight && item.weight !== '')
          .map((item: ListItem) => Number(item.weight));
        return arrayWeight;
      }
    } else {
      throw new TypeError('options is undefined');
    }
  }

  private static getTotalWeight(): number | undefined {
    const arrayWeight = canvasComponent.getOptions();
    if (arrayWeight) {
      const totalWeight = arrayWeight.reduce((acc, current) => {
        acc += current;
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

  private createWheelCanvas(): void {
    this.node.setAttribute('width', '500');
    this.node.setAttribute('height', '500');
  }

  private draw(): void {
    const arrayWeight = canvasComponent.getOptions();
    const totalWeight = canvasComponent.getTotalWeight();
    let startAngle = 0;
    if (arrayWeight && totalWeight) {
      arrayWeight.forEach((item) => {
        const sliceAngle = (item * Math.PI * 2) / totalWeight;
        if (this.node instanceof HTMLCanvasElement) {
          const centerX = this.node.width / 2;
          const centerY = this.node.height / 2;
          const radius = this.node.height / 2;
          const context = this.node.getContext('2d');
          if (context) {
            context.beginPath();
            context.moveTo(centerX, centerY);
            context.arc(centerX, centerY, radius, startAngle, sliceAngle + startAngle);
            context.closePath();
            const color = Object.values(canvasComponent.randomColor()).join(',');
            context.fillStyle = `rgb(${color})`;
            context.fill();
            context.strokeStyle = 'black';
            context.lineWidth = 2;
            context.stroke();
            startAngle += sliceAngle;
          } else {
            throw new TypeError('canvas-unsupported code here');
          }
        }
      });
    }
  }
}
