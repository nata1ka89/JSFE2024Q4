import { BaseComponent } from '../../utils/base-component';
import '../../style/authentication-style.css';
import { doSend } from '../../api/authentication-api';
import type { User } from '../../utils/data-types';
import type Router from '../router';
export class Authentication extends BaseComponent {
  private router: Router;
  constructor(_parentNode: HTMLElement | null, router: Router) {
    super(_parentNode, 'form', 'form-authentication');
    this.router = router;
    this.createForm();
  }

  private static validateInput(input: BaseComponent, error: BaseComponent): void {
    if (input.node instanceof HTMLInputElement) {
      const isValid = input.node.value.trim().length >= 4 && input.node.value.trim().length <= 20;
      error.node.style.display = isValid ? 'none' : 'block';
    }
  }

  private static validateForm(inputs: BaseComponent[], logButton: BaseComponent): void {
    const allValid = inputs.every((input) => {
      if (input.node instanceof HTMLInputElement) {
        return input.node.value.trim().length >= 4 && input.node.value.trim().length <= 20;
      }
      return false;
    });
    if (allValid) {
      logButton.removeAttribute('disabled');
    } else {
      logButton.setAttribute('disabled', 'true');
    }
  }

  private createForm(): void {
    const fieldset = new BaseComponent(this.node, 'fieldset', 'fieldset');
    new BaseComponent(fieldset.node, 'legend', 'fieldset', 'Authentication');

    const nameDiv = new BaseComponent(fieldset.node, 'div', 'container-filed');
    new BaseComponent(nameDiv.node, 'label', '', 'Name');
    const nameInput = new BaseComponent(nameDiv.node, 'input', 'input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('placeholder', 'Enter your name');
    nameInput.setAttribute('required', 'true');
    nameInput.setAttribute('minlength', '4');
    nameInput.setAttribute('maxlength', '20');
    const nameError = new BaseComponent(
      nameDiv.node,
      'span',
      'error-message',
      'Name must be between 4 and 20 characters'
    );

    const passwordDiv = new BaseComponent(fieldset.node, 'div', 'container-filed');
    new BaseComponent(passwordDiv.node, 'label', '', 'Password');
    const passwordInput = new BaseComponent(passwordDiv.node, 'input', 'input');
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('placeholder', 'Enter password');
    passwordInput.setAttribute('required', 'true');
    passwordInput.setAttribute('minlength', '4');
    passwordInput.setAttribute('maxlength', '20');
    const passwordError = new BaseComponent(
      passwordDiv.node,
      'span',
      'error-message',
      'Password must be between 4 and 20 characters'
    );

    const buttonsDiv = new BaseComponent(fieldset.node, 'div', 'container-buttons');
    const logButton = new BaseComponent(buttonsDiv.node, 'button', 'log-button', 'Log in');
    logButton.setAttribute('disabled', 'true');
    logButton.setCallback('click', (event) => {
      event.preventDefault();
      if (
        nameInput.node instanceof HTMLInputElement &&
        passwordInput.node instanceof HTMLInputElement
      ) {
        const newUser: User = {
          id: crypto.randomUUID(),
          type: 'USER_LOGIN',
          payload: {
            user: {
              login: nameInput.node.value,
              password: passwordInput.node.value,
            },
          },
        };
        doSend(newUser);
        localStorage.setItem('isAuthenticated', 'true');
      }
      this.router.navigate('/main');
    });
    const infoButton = new BaseComponent(buttonsDiv.node, 'button', 'info-button', 'Info');
    infoButton.setCallback('click', () => this.router.navigate('/about'));
    infoButton.setAttribute('type', 'button');
    const inputs = [nameInput, passwordInput];
    for (const input of inputs) {
      input.node.addEventListener('input', () => {
        Authentication.validateInput(input, input === nameInput ? nameError : passwordError);
        Authentication.validateForm(inputs, logButton);
      });
    }
  }
}
