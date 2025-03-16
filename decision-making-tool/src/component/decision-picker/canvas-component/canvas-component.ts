import { BaseComponent } from '../../../utils/base-component';
import { DataSections } from './data-section';
import { ViewSections } from './draw-sections';

export class CanvasComponent extends BaseComponent {
  private options = DataSections.getOptions();
  private totalWeight = DataSections.getTotalWeight();
  private color = DataSections.generateSectionColors();

  constructor(_parenNode: HTMLElement | null) {
    super(_parenNode, 'canvas', 'wheel-canvas');
    if (this.node instanceof HTMLCanvasElement) {
      this.createWheelCanvas();
      if (this.options && this.totalWeight && this.color) {
        new ViewSections(this.node, this.options, this.totalWeight, this.color);
      } else {
        throw new TypeError('no data to display canvas');
      }
      this.createCenter();
      this.createCursor();
    }
  }

  private createWheelCanvas(): void {
    this.node.setAttribute('width', '500');
    this.node.setAttribute('height', '500');
  }

  private createCenter(): void {
    if (this.node instanceof HTMLCanvasElement) {
      const centerX = this.node.width / 2;
      const centerY = this.node.height / 2;
      const radius = (this.node.height * 13) / 100 / 2;
      const context = this.node.getContext('2d');
      if (context) {
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 360);
        context.closePath();
        context.fillStyle = `rgb(74, 144, 226)`;
        context.fill();
        context.strokeStyle = 'white';
        context.lineWidth = 2;
        context.stroke();
      } else {
        throw new TypeError('canvas-unsupported code here');
      }
    }
  }

  private createCursor(): void {
    if (this.node instanceof HTMLCanvasElement) {
      const context = this.node.getContext('2d');
      if (context) {
        context.beginPath();
        context.moveTo(this.node.width / 2 - 15, 1);
        context.lineTo(this.node.width / 2 + 15, 1);
        context.lineTo(this.node.width / 2, 50);
        context.closePath();
        context.fill();
        context.stroke();
      }
    }
  }
}
