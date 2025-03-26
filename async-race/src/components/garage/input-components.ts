import { BaseComponent } from '../../utils/base-component';
import '../../style/input-style.css';

export class InputElement extends BaseComponent {
  constructor(_parenNode: HTMLElement | null) {
    super(_parenNode, 'div', 'input-container');
    this.createInputElements();
  }

  private createInputElements(): void {
    const createDiv = new BaseComponent(this.node, 'div', 'create');
    const createInput = new BaseComponent(createDiv.node, 'input', 'input-create');
    createInput.setAttribute('type', 'text');
    createInput.setAttribute('value', '');
    const createInputColor = new BaseComponent(createDiv.node, 'input', 'input-color');
    createInputColor.setAttribute('type', 'color');
    createInputColor.setAttribute('value', '#ffffff');
    const createButton = new BaseComponent(createDiv.node, 'button', 'create-button', 'Create');
    createButton.setCallback('click', () => console.log('click createButton'));

    const updateDiv = new BaseComponent(this.node, 'div', 'create');
    const updateInput = new BaseComponent(updateDiv.node, 'input', 'input-update');
    updateInput.setAttribute('type', 'text');
    updateInput.setAttribute('value', '');
    const updateInputColor = new BaseComponent(updateDiv.node, 'input', 'input-color');
    updateInputColor.setAttribute('type', 'color');
    updateInputColor.setAttribute('value', '#ffffff');
    const updateButton = new BaseComponent(updateDiv.node, 'button', 'update-button', 'Update');
    updateButton.setCallback('click', () => console.log('click updateButton'));
  }
}
