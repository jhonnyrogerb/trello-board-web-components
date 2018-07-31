import './board.component.scss';
import { Board } from './board.model';
import { boardTemplate } from './board.template';
import { Card } from '../card/card.model';
import { Globals } from '../../../app/globals';
import { List } from '../list/list.model';
import { listTemplate } from '../list/list.template';
import { Util } from '../../../app/helpers/util';
import { PouchdbListService } from '../../services/list.service'
import { PouchdbCardService } from '../../services/card.service';

export class BoardComponent extends HTMLElement {
  private board: Board
  private formAddListNode: HTMLElement
  private btnShowFormNode: HTMLElement
  private btnHideFormNode: HTMLElement
  private inpListName: HTMLInputElement
  private btnAddListNode: HTMLElement
  private listFormNode: HTMLElement
  private boardWrapperNode: HTMLElement
  private boardNode: HTMLElement

  private listService: PouchdbListService;
  private cardService: PouchdbCardService;


  constructor() {
    super();
    this.listService = new PouchdbListService();
    this.cardService = new PouchdbCardService();
  }


  public async connectedCallback() {
    this.board = new Board('Board De Teste');
    await this.listService.createIndexes();
    this.board.lists = await this.getBoardLists();

    const template = boardTemplate(this.board);

    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(Util.stringToElement(template));

      this.formAddListNode = this.shadowRoot!.querySelector('.form-add-list')! as HTMLElement;
      this.btnShowFormNode = this.shadowRoot!.querySelector('.btn-show-form')! as HTMLElement;
      this.btnHideFormNode = this.shadowRoot!.querySelector('.btn-hide-form')! as HTMLElement;
      this.btnAddListNode = this.shadowRoot!.querySelector('.btn-add-list')! as HTMLElement;
      this.inpListName = this.shadowRoot!.querySelector('.inp-list-name')! as HTMLInputElement;
      this.listFormNode = this.shadowRoot!.querySelector(".list-form-add-list")! as HTMLElement
      this.boardWrapperNode = shadowRoot.querySelector('.board-wrapper')! as HTMLElement
      this.boardNode = shadowRoot.querySelector('.board')! as HTMLElement

      this.btnAddListNode.onclick = this.addList
      this.btnHideFormNode.onclick = this.hideAddForm
      this.btnShowFormNode.onclick = this.showAddForm;
      this.boardWrapperNode.ondragover = this.mouseOnEdges
      this.boardWrapperNode.onmousemove = this.onMouseMove
    }
  }


  private async getBoardLists(): Promise<List[]> {
    const result = await this.listService.query({}, 100);
    const lists = result.docs as List[];

    const listWithCards = lists.map(async list => {
      const { docs } = await this.cardService.query({ "listId": list._id }, 100);
      return { ...list, cards: docs };
    })

    return  Promise.all(listWithCards);
  }

  private showAddForm = (event?: Event) => {
    this.formAddListNode.style.display = 'block'
    this.btnShowFormNode.style.display = 'none'
    this.inpListName.value = ''
    this.formAddListNode.style.backgroundColor = "#E2E4E6";
    return false
  }


  private hideAddForm = (event: Event) => {
    this.formAddListNode.style.display = 'none'
    this.btnShowFormNode.style.display = 'block'
    this.formAddListNode.style.removeProperty("backgroundColor");
    this.inpListName.value = ''

    return false
  }


  private addList = async (event: Event) => {
    event.preventDefault()

    const listName = this.inpListName.value
    const listIndex = this.board.lists.length
    
    if (Util.isEmptyString(listName)) return false

    const list = new List(listName, 0, listIndex)    
    const result = await this.listService.putOne(null, list);
    this.board.lists.push(list);

    this.listFormNode.insertAdjacentHTML('beforebegin',
      `<trello-list list='${JSON.stringify({ ...list, _id: result.id })}'>
      </trello-list>`);

    this.hideAddForm(event)
    return false
  }


  private mouseOnEdges = (event: DragEvent) => {
    event.preventDefault();

    this.boardNode.style.pointerEvents = 'none'
    if (event.pageX < 170) {
      this.boardWrapperNode.scrollLeft = this.boardWrapperNode.scrollLeft -= 20;
    } else if (this.boardWrapperNode.clientWidth - event.pageX < 170) {
      this.boardWrapperNode.scrollLeft = this.boardWrapperNode.scrollLeft += 20;
    } else {
      this.boardNode.style.removeProperty("pointer-events")
    }
  }


  private onMouseMove = (event: MouseEvent) => {
    if (this.boardNode.style.pointerEvents) {
      this.boardNode.style.removeProperty("pointer-events")
    }
  }
}

if (!customElements.get('trello-board')) {
  customElements.define('trello-board', BoardComponent);
}
