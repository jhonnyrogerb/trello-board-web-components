import { List } from '../list/list.model';

export class Board {
  public name: string;
  public lists: List[];

  constructor(name?: string) {
    this.name = name!;
    this.lists = [];
  }
}
