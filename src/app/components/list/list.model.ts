import { Card } from '../card/card.model';

export class List {
  public _id: string;
  public title: string;
  public boardId: number;
  public cards: Card[];
  public boardIndex: number;

  constructor(title: string, boardId: number, boardIndex?: number) {
    this.title = title;
    this.boardId = boardId;
    this.cards = [];
    this.boardIndex = boardIndex;
  }
}
