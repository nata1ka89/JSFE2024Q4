import { BaseComponent } from '../../utils/base-component';
import '../../style/authentication-style.css';
import { doSend } from '../../api/authentication-api';
import type Router from '../router';
import {
  ABOUT_ROUTE,
  AUTHENTICATION_TITLE,
  BUTTON_INFO,
  BUTTON_LOGIN,
  LABEL_NAME,
  LABEL_PASSWORD,
  MAX_LENGTH,
  MIN_LENGTH,
  PLACEHOLDER_LOGIN,
  PLACEHOLDER_PASSWORD,
  VALID_LOGIN,
  VALID_PASSWORD,
} from '../../utils/constants';
import { Type } from '../../utils/server-data-type';
import type { UserRequest } from '../../utils/server-data-type';
import { requestAllUsersActive, requestAllUsersInActive } from '../../api/request-app';

export class Authentication extends BaseComponent {
  private router: Router;
  constructor(_parentNode: HTMLElement | null, router: Router) {
    super(_parentNode, 'form', 'form-authentication');
    this.router = router;
    this.createForm();
  }

  private static validateInput(input: BaseComponent, error: BaseComponent): void {
    if (input.node instanceof HTMLInputElement) {
      const isValid =
        input.node.value.trim().length >= MIN_LENGTH &&
        input.node.value.trim().length <= MAX_LENGTH;
      error.node.style.display = isValid ? 'none' : 'block';
    }
  }

  private static validateForm(inputs: BaseComponent[], logButton: BaseComponent): void {
    const allValid = inputs.every((input) => {
      if (input.node instanceof HTMLInputElement) {
        return (
          input.node.value.trim().length >= MIN_LENGTH &&
          input.node.value.trim().length <= MAX_LENGTH
        );
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
    new BaseComponent(fieldset.node, 'legend', 'fieldset', AUTHENTICATION_TITLE);
    const nameDiv = new BaseComponent(fieldset.node, 'div', 'container-filed');
    new BaseComponent(nameDiv.node, 'label', '', LABEL_NAME);
    const nameInput = new BaseComponent(nameDiv.node, 'input', 'input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('placeholder', PLACEHOLDER_LOGIN);
    nameInput.setAttribute('required', 'true');
    nameInput.setAttribute('minlength', MIN_LENGTH.toString());
    nameInput.setAttribute('maxlength', MAX_LENGTH.toString());
    const nameError = new BaseComponent(nameDiv.node, 'span', 'error-message', VALID_LOGIN);
    const passwordDiv = new BaseComponent(fieldset.node, 'div', 'container-filed');
    new BaseComponent(passwordDiv.node, 'label', '', LABEL_PASSWORD);
    const passwordInput = new BaseComponent(passwordDiv.node, 'input', 'input');
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('placeholder', PLACEHOLDER_PASSWORD);
    passwordInput.setAttribute('required', 'true');
    passwordInput.setAttribute('minlength', MIN_LENGTH.toString());
    passwordInput.setAttribute('maxlength', MAX_LENGTH.toString());
    const passwordError = new BaseComponent(
      passwordDiv.node,
      'span',
      'error-message',
      VALID_PASSWORD
    );
    const buttonsDiv = new BaseComponent(fieldset.node, 'div', 'container-buttons');
    const logButton = new BaseComponent(buttonsDiv.node, 'button', 'log-button', BUTTON_LOGIN);
    logButton.setAttribute('disabled', 'true');
    logButton.setCallback('click', (event) => {
      event.preventDefault();
      if (
        nameInput.node instanceof HTMLInputElement &&
        passwordInput.node instanceof HTMLInputElement
      ) {
        const newUser: UserRequest = {
          id: crypto.randomUUID(),
          type: Type.USER_LOGIN,
          payload: {
            user: {
              login: nameInput.node.value,
              password: passwordInput.node.value,
            },
          },
        };
        doSend(newUser);
        requestAllUsersActive();
        requestAllUsersInActive();
        sessionStorage.setItem('currentUserId', newUser.id);
        sessionStorage.setItem('currentUserLogin', newUser.payload.user.login);
        sessionStorage.setItem('currentUserPassword', newUser.payload.user.password);
      }
    });
    const infoButton = new BaseComponent(buttonsDiv.node, 'button', 'info-button', BUTTON_INFO);
    infoButton.setCallback('click', () => this.router.navigate(ABOUT_ROUTE));
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
