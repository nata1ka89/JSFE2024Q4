import { BaseComponent } from './component/base-component';
import ModalComponent from './component/modal/modal-component';
import { ButtonsComponent } from './component/buttons/buttons-component';
import { ListComponent } from './component/options/list-component';
import './style.css';
const main = new BaseComponent(document.body, 'main', 'main-container');

const list = new ListComponent(main.node);
const clickPasteButtons = new ModalComponent(main.node);

new ButtonsComponent(main.node, list, clickPasteButtons);
