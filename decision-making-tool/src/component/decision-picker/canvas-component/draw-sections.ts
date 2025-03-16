import { DataSections } from './data-section';

export class ViewSections {
  private node: HTMLCanvasElement;
  private options: { title: string; weight: number }[];
  private totalWeight: number;
  private color: string[];

  constructor(
    node: HTMLCanvasElement,
    options: { title: string; weight: number }[],
    totalWeight: number,
    color: string[]
  ) {
    this.node = node;
    this.options = options;
    this.totalWeight = totalWeight;
    this.color = color;
    this.draw();
  }

  public draw(): void {
    let startAngle = 0;
    if (this.options && this.totalWeight) {
      this.options.forEach((item, index) => {
        if (this.totalWeight) {
          const sliceAngle = (item.weight / this.totalWeight) * Math.PI * 2;
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

              context.fillStyle = this.color[index];
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
                  item.title = DataSections.clipText(context, item.title, maxTextWidth);
                }
                context.strokeText(item.title, (radius + radiusCenter) / 2, 0);
                context.fillText(item.title, (radius + radiusCenter) / 2, 0);
                context.restore();
              }
              startAngle += sliceAngle;
            }
          } else {
            throw new TypeError('canvas-unsupported code here');
          }
        }
      });
    }
  }
}
