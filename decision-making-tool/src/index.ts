import { BaseComponent } from './component/base-component';
import { ListComponent } from './component/list-component';
import './style.css';
const main = new BaseComponent(document.body, 'main', 'main-container');

new ListComponent(main.node);
new ListComponent(main.node);
