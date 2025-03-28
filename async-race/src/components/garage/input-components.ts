import { BaseComponent } from '../../utils/base-component';
import '../../style/input-style.css';
import { inputState } from '../../state/garage-state';
import type { InputState } from '../../state/garage-state';
export class InputElement extends BaseComponent {
  constructor(_parenNode: HTMLElement | null) {
    super(_parenNode, 'div', 'input-container');
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

  private createInputElements(): void {
    const createDiv = new BaseComponent(this.node, 'div', 'create');
    const createInput = new BaseComponent(createDiv.node, 'input', 'input-create');
    createInput.setAttribute('type', 'text');
    createInput.setAttribute('value', inputState.createInput);
    const createInputColor = new BaseComponent(createDiv.node, 'input', 'input-color');
    createInputColor.setAttribute('type', 'color');
    createInputColor.setAttribute('value', inputState.createInputColor);
    const createButton = new BaseComponent(createDiv.node, 'button', 'create-button', 'Create');
    createButton.setCallback('click', () => console.log('click createButton'));

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
