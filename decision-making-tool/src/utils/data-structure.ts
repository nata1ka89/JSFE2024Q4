import type { BaseComponent } from './base-component';

export type ListItem = {
  id: string;
  title: string;
  weight: string;
};

export type JsonData = {
  list: ListItem[];
  lastId: number;
};

export type InputItem = {
  idRandom: string;
  inputTitle: BaseComponent;
  inputWeight: BaseComponent;
};
