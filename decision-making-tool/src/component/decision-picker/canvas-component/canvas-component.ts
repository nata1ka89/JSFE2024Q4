import { BaseComponent } from '../../../utils/base-component';
import { DataSections } from './data-section';
import { ViewSections } from './draw-sections';
import audioPath from '../../../assets/audio-end.mp3';
export class CanvasComponent extends BaseComponent {
  private options = DataSections.getOptions();
  private totalWeight = DataSections.getTotalWeight();
  private color = DataSections.generateSectionColors();
  private isRotating: boolean = false;
  private rotationAngle: number = 0;
  private pickedDisplay: HTMLElement;
  constructor(_parenNode: HTMLElement | null, pickedDisplay: HTMLElement) {
    super(_parenNode, 'canvas', 'wheel-canvas');
    this.pickedDisplay = pickedDisplay;
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

  private static playSound(): void {
    const audio = new Audio(audioPath);
    void audio.play();
  }

  private static easeOutSine(x: number): number {
    return Math.sin((x * Math.PI) / 2);
  }

  public rotationWheel(duration: number, isMute: boolean): void {
    if (this.isRotating) return;
    this.rotationAngle = 0;
    this.drawWheel();
    this.isRotating = true;
    const totalDuration = duration * 1000; // Rotation time in milliseconds
    const startTime = performance.now();
    const fullTurns = Math.max(5, Math.floor(totalDuration / 1000)); // Minimum 5 full turns
    const randomStopAngle = Math.random() * Math.PI * 2; // Random stop angle

    const animate = (currentTime: number): void => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / totalDuration, 1); // Progress from 0 to 1
      const easedProgress = CanvasComponent.easeOutSine(progress);
      this.rotationAngle = easedProgress * (Math.PI * 2 * fullTurns + randomStopAngle); // Current rotation angle
      this.drawWheel();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.isRotating = false;
        if (!isMute) {
          CanvasComponent.playSound();
        }
        this.determinePickedOption();
      }
    };
    requestAnimationFrame(animate);
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
        context.moveTo(this.node.width, this.node.height / 2 - 15);
        context.lineTo(this.node.width, this.node.height / 2 + 15);
        context.lineTo(this.node.width - 50, this.node.height / 2);
        context.closePath();
        context.fill();
        context.stroke();
      }
    }
  }

  private drawWheel(): void {
    if (this.node instanceof HTMLCanvasElement) {
      const context = this.node.getContext('2d');
      if (context) {
        context.clearRect(0, 0, this.node.width, this.node.height);
        context.save();
        context.translate(this.node.width / 2, this.node.height / 2);
        context.rotate(this.rotationAngle);
        context.translate(-this.node.width / 2, -this.node.height / 2);
        if (this.options && this.totalWeight && this.color)
          new ViewSections(this.node, this.options, this.totalWeight, this.color); // Redrawing sections
        context.restore();
        this.createCenter();
        this.createCursor();
      }
    }
  }

  private determinePickedOption(): void {
    if (this.options) {
      const pickedAngle = this.rotationAngle % (Math.PI * 2); // Stopping angle
      let startAngle = 0;
      for (const option of this.options) {
        if (this.totalWeight) {
          const sliceAngle = (option.weight / this.totalWeight) * Math.PI * 2;
          if (pickedAngle >= startAngle && pickedAngle < startAngle + sliceAngle) {
            this.pickedDisplay.textContent = `${option.title}`;
            break;
          } else {
            startAngle += sliceAngle;
          }
        }
      }
    }
  }
}
