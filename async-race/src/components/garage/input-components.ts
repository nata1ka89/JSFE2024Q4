import { BaseComponent } from '../../utils/base-component';
import '../../style/input-style.css';
import { inputState, setInputState, subscribeInputState } from '../../state/garage-state';
import type { InputState } from '../../utils/data-types-garage';
import { createCar, getCars, updateCar } from '../../api/api-garage';
export class InputElement extends BaseComponent {
  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode, 'div', 'input-container');
    this.createInputElements();
    subscribeInputState(() => {
      this.updateInput();
    });
  }

  private static inputHandlers(input: BaseComponent, key: keyof InputState): void {
    input.setCallback('input', () => {
      if (input.node instanceof HTMLInputElement) inputState[key] = input.node.value;
    });
  }

  private static async updateHandlers(id: number): Promise<void> {
    try {
      const newCar = {
        name: inputState.updateInput,
        color: inputState.updateInputColor,
        id: Number(inputState.idCar),
      };
      await updateCar(id, newCar);
      await getCars();
      setInputState({
        updateInput: '',
        updateInputColor: '#ffffff',
        updateState: 'true',
      });
    } catch (error) {
      console.error('Error creating car:', error);
    }
  }

  public updateInput(): void {
    this.node.textContent = '';
    this.createInputElements();
  }

  private async createHandlers(): Promise<void> {
    const newCar = {
      name: inputState.createInput,
      color: inputState.createInputColor,
    };
    try {
      await createCar(newCar);
      await getCars();
      inputState.createInput = '';
      inputState.createInputColor = '#ffffff';
      this.updateInput();
    } catch (error) {
      console.error('Error creating car:', error);
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

    const updateDiv = new BaseComponent(this.node, 'div', 'update');
    const updateInput = new BaseComponent(updateDiv.node, 'input', 'input-update');
    updateInput.setAttribute('type', 'text');
    updateInput.setAttribute('value', inputState.updateInput);
    const updateInputColor = new BaseComponent(updateDiv.node, 'input', 'input-color');
    updateInputColor.setAttribute('type', 'color');
    updateInputColor.setAttribute('value', inputState.updateInputColor);
    if (inputState.updateState === 'false') {
      updateInput.removeAttribute('disabled');
      updateInputColor.removeAttribute('disabled');
    } else {
      updateInput.setAttribute('disabled', 'true');
      updateInputColor.setAttribute('disabled', 'true');
    }
    const updateButton = new BaseComponent(updateDiv.node, 'button', 'update-button', 'Update');
    updateButton.setCallback(
      'click',
      () => void InputElement.updateHandlers(Number(inputState.idCar))
    );

    InputElement.inputHandlers(createInput, 'createInput');
    InputElement.inputHandlers(createInputColor, 'createInputColor');
    InputElement.inputHandlers(updateInput, 'updateInput');
    InputElement.inputHandlers(updateInputColor, 'updateInputColor');
  }
}
