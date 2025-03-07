import { BaseComponent } from './component/base-component';
import { ButtonsComponent } from './component/buttons-component';
import { ListComponent } from './component/list-component';
import './style.css';
const main = new BaseComponent(document.body, 'main', 'main-container');

const list = new ListComponent(main.node);

new ButtonsComponent(main.node, list);
