export class Card {
  public _id: string;
  public title: string;
  public descripton: string;
  public createdAt: Date;
  public updatedAt: Date;
  public listId: string;
  public listIndex: number;

  constructor(title: string, listId: string, listIndex: number) {
    this.title = title;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.listId = listId;
    this.listIndex = listIndex;
  }
}
