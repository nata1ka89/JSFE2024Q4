import { BaseComponent } from '../../utils/base-component';
import '../../style/authentication-style.css';
export class Authentication extends BaseComponent {
  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode, 'form', 'form-authentication');
    this.createForm();
  }

  private createForm(): void {
    const fieldset = new BaseComponent(this.node, 'fieldset', 'fieldset');
    new BaseComponent(fieldset.node, 'legend', 'fieldset', 'Authentication');
    const divName = new BaseComponent(fieldset.node, 'div', 'container-filed');
    new BaseComponent(divName.node, 'label', '', 'Name');
    const inputName = new BaseComponent(divName.node, 'input', 'input');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('placeholder', 'Enter your name');
    inputName.setAttribute('required', 'true');
    inputName.setAttribute('minlength', '4');
    inputName.setAttribute('maxlength', '20');
    const divPassword = new BaseComponent(fieldset.node, 'div', 'container-filed');
    new BaseComponent(divPassword.node, 'label', '', 'Password');
    const inputPassword = new BaseComponent(divPassword.node, 'input', 'input');
    inputPassword.setAttribute('type', 'password');
    inputPassword.setAttribute('placeholder', 'Enter password');
    inputPassword.setAttribute('required', 'true');
    inputName.setAttribute('minlength', '4');
    inputName.setAttribute('maxlength', '20');
    const divButtons = new BaseComponent(fieldset.node, 'div', 'container-buttons');
    const logButton = new BaseComponent(divButtons.node, 'button', 'log-button', 'Log in');
    logButton.setAttribute('type', 'submit');
    logButton.setAttribute('disabled', 'true');
    logButton.setCallback('click', () => console.log('click logButton'));
    const infoButton = new BaseComponent(divButtons.node, 'button', 'info-button', 'Info');
    infoButton.setCallback('click', () => console.log('click infoButton'));
    infoButton.setAttribute('type', 'button');
  }
}
