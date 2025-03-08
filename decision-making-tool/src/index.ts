import { BaseComponent } from './component/base-component';
import ButtonEvents from './component/modal-component';
import { ButtonsComponent } from './component/buttons-component';
import { ListComponent } from './component/list-component';
import './style.css';
const main = new BaseComponent(document.body, 'main', 'main-container');

const list = new ListComponent(main.node);
const clickPasteButtons = new ButtonEvents(main.node);

new ButtonsComponent(main.node, list, clickPasteButtons);
