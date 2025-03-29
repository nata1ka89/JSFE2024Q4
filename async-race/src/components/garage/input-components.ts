import { BaseComponent } from '../../utils/base-component';
import '../../style/input-style.css';
import { inputState } from '../../state/garage-state';
import type { InputState } from '../../utils/data-types';
import { createCar, getCars } from '../../api/api-garage';
import type { Cars } from './cars';
import type { Pagination } from './pagination';
export class InputElement extends BaseComponent {
  private cars: Cars;
  private pagination: Pagination;
  constructor(_parenNode: HTMLElement | null, cars: Cars, pagination: Pagination) {
    super(_parenNode, 'div', 'input-container');
    this.cars = cars;
    this.pagination = pagination;
    this.createInputElements();
  }

  private static inputHandlers(input: BaseComponent, key: keyof InputState): void {
    input.setCallback('input', () => {
      if (input.node instanceof HTMLInputElement) {
        inputState[key] = input.node.value;
      }
    });
  }

  public updateInput(): void {
    this.node.textContent = '';
    this.createInputElements();
  }

  private async createHandlers(): Promise<void> {
    if (inputState.createInput && inputState.createInputColor) {
      const newCar = {
        name: inputState.createInput,
        color: inputState.createInputColor,
      };
      try {
        await createCar(newCar);
        await getCars();
        this.cars.updateCars();
        inputState.createInput = '';
        inputState.createInputColor = '#ffffff';
        this.updateInput();
        this.pagination.updatePagination();
      } catch (error) {
        console.error('Error creating car:', error);
      }
    }
  }

  private createInputElements(): void {
    const createDiv = new BaseComponent(this.node, 'div', 'create');
    const createInput = new BaseComponent(createDiv.node, 'input', 'input-create');
    createInput.setAttribute('type', 'text');
    createInput.setAttribute('value', inputState.createInput);
    const createInputColor = new BaseComponent(createDiv.node, 'input', 'input-color');
    createInputColor.setAttribute('type', 'color');
    createInputColor.setAttribute('value', inputState.createInputColor);
    const createButton = new BaseComponent(createDiv.node, 'button', 'create-button', 'Create');
    createButton.setCallback('click', () => void this.createHandlers());

    const updateDiv = new BaseComponent(this.node, 'div', 'create');
    const updateInput = new BaseComponent(updateDiv.node, 'input', 'input-update');
    updateInput.setAttribute('type', 'text');
    updateInput.setAttribute('value', inputState.updateInput);
    updateInput.setAttribute('disabled', 'true');
    const updateInputColor = new BaseComponent(updateDiv.node, 'input', 'input-color');
    updateInputColor.setAttribute('type', 'color');
    updateInputColor.setAttribute('value', inputState.updateInputColor);
    updateInputColor.setAttribute('disabled', 'true');
    const updateButton = new BaseComponent(updateDiv.node, 'button', 'update-button', 'Update');
    updateButton.setCallback('click', () => console.log('click updateButton'));

    InputElement.inputHandlers(createInput, 'createInput');
    InputElement.inputHandlers(createInputColor, 'createInputColor');
    InputElement.inputHandlers(updateInput, 'updateInput');
    InputElement.inputHandlers(updateInputColor, 'updateInputColor');
  }
}
