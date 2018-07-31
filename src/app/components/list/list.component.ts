import { Globals } from '../../../app/globals';
import { List } from './list.model';
import { listTemplate } from './list.template';
import { Util } from '../../../app/helpers/util';
import { PouchdbCardService } from '../../services/card.service'

import './list.component.scss';
import { Card } from '../card/card.model';
import { PouchdbListService } from '../../services/list.service';



export class ListComponent extends HTMLElement {
  public list: List
  public listNode: HTMLElement
  public listContentNode: HTMLElement
  public listCardsNode: HTMLElement
  public listWrapperNode: HTMLElement
  public btnShowForm: HTMLLinkElement
  public btnHideForm: HTMLButtonElement
  public btnAddTrelloCard: HTMLButtonElement
  public formAddTrelloCard: HTMLFormElement
  public titleTextArea: HTMLInputElement
  private cardService: PouchdbCardService;
  private listService: PouchdbListService;

  
  constructor() {
    super();
    this.cardService = new PouchdbCardService();
    this.listService = new PouchdbListService();
  }


  public connectedCallback() {
    try {
      this.list = JSON.parse(this.getAttribute('list')!)
    } catch (e) {
      return
    }

    const template = listTemplate(this.list);

    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(Util.stringToElement(template));

      this.listNode = this.shadowRoot!.querySelector('.list')! as HTMLElement;
      this.listContentNode = this.shadowRoot!.querySelector('.list-content')! as HTMLElement;
      this.listCardsNode = this.shadowRoot!.querySelector('.list-cards')! as HTMLElement
      this.listWrapperNode = this.shadowRoot!.querySelector('.list-wrapper')! as HTMLElement
      this.btnShowForm = this.shadowRoot!.querySelector('.btn-show-form')! as HTMLLinkElement
      this.btnHideForm = this.shadowRoot!.querySelector('.btn-hide-form')! as HTMLButtonElement
      this.btnAddTrelloCard = this.shadowRoot!.querySelector('.btn-add-trello-card')! as HTMLButtonElement
      this.formAddTrelloCard = this.shadowRoot!.querySelector('.form-add-trello-card')! as HTMLFormElement
      this.titleTextArea = this.formAddTrelloCard.querySelector('.trello-card-title')! as HTMLInputElement;
      this.listNode.draggable = true;
      this.listNode.ondragstart = this.onDragStart
      this.listWrapperNode.ondragover = this.onDragOver
      this.listWrapperNode.ondragend = this.onDragEnd
      this.btnShowForm.onclick = this.showAddTrelloCardForm
      this.btnHideForm.onclick = this.hideAddTrelloCardForm
      this.btnAddTrelloCard.onclick = this.addTrelloCard
      this.titleTextArea.onkeyup = this.autoGrowTextArea
      this.titleTextArea.onkeypress = this.addTrelloCardOnEnter
    }
  }


  private onDragOver = (event: DragEvent): void => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';

    const target = event.target as HTMLElement

    if (!Util.isSameNodeName(Globals.draggableElement, "TRELLO-CARD")) {
      this.listNode.style.zIndex = '-1';
    }

    if (!target.isSameNode(this.listWrapperNode)) return;

    if (Util.isSameNodeName(Globals.draggableElement, "TRELLO-LIST")) {
      const parent = this.parentElement! as HTMLElement;
      const next = this.nextElementSibling! as HTMLElement;
      const previous = this.previousElementSibling! as HTMLElement;
      const grandpa = parent.parentElement! as HTMLElement;
      const first = parent.firstElementChild as HTMLElement;
      const last = parent.lastElementChild! as HTMLElement;

      if (this && this !== Globals.draggableElement) {
        if (first === Globals.draggableElement) {
          parent.insertBefore(this, Globals.draggableElement);
        } else if (first === this) {
          parent.insertBefore(Globals.draggableElement!, this);
        } else if (last === Globals.draggableElement!) {
          parent.insertBefore(Globals.draggableElement!, this);
        } else {
          if (Globals.draggableElement! === next) {
            parent.insertBefore(Globals.draggableElement!, this);
          } else {
            parent.insertBefore(Globals.draggableElement!, next);
          }
        }
      }
    }

    if (Util.isSameNodeName(Globals.draggableElement, "TRELLO-CARD")) {
      this.listCardsNode.insertAdjacentElement('beforeend', Globals.draggableElement);
    }

    this.listNode.style.zIndex = '10';
  };


  private onDragEnd = (event: DragEvent): void => {
    event.preventDefault();

    const parent = this.parentElement! as HTMLElement;
    this.listNode.style.zIndex = '10';

    if (!Util.isSameNodeName(Globals.draggableElement, "TRELLO-LIST")) return;

    this.listNode.style.background = '#E1E3E5';
    this.listContentNode.style.removeProperty('visibility');

    Array.from(parent.querySelectorAll('trello-list')).forEach((element, index) => {
      const trelloList = element as ListComponent;

      trelloList.list = { ...trelloList.list, boardIndex: index };
      this.listService.putOne(trelloList.list._id, trelloList.list)
    });
  };


  private onDragStart = (event: DragEvent): void => {
    if (!this.listNode.isSameNode(event.target as HTMLElement)) return;

    Globals.draggableElement = this;

    event.dataTransfer.setData('text/html', this.innerHTML);
    event.dataTransfer.effectAllowed = 'move';

    setTimeout(() => {
      this.listNode.style.background = 'rgba(0, 0, 0, .2)';
      this.listContentNode.style.visibility = 'hidden';
    }, 100);
  };


  private showAddTrelloCardForm = (event: Event) => {
    if (!this.formAddTrelloCard.style.display || this.formAddTrelloCard.style.display === "none") {
      this.formAddTrelloCard.style.display = 'block'
      this.btnShowForm.style.display = 'none'
      this.titleTextArea.focus()
      this.listCardsNode.scrollTop = this.listCardsNode.clientHeight
    } else {
      this.formAddTrelloCard.style.display = 'none'
      this.btnShowForm.style.display = 'block'
    }
  }


  private hideAddTrelloCardForm = (event: Event) => {
    if (this.formAddTrelloCard.style.display === "block") {
      this.formAddTrelloCard.style.display = 'none'
      this.btnShowForm.style.display = 'block'
    } else {
      this.formAddTrelloCard.style.display = 'block'
      this.btnShowForm.style.display = 'none'
    }
  }


  private addTrelloCardOnEnter = (event: KeyboardEvent) => {
    if (event.keyCode === 13) {
      this.addTrelloCard(event);
    }
  };


  private addTrelloCard = async (event: Event) => {
    event.preventDefault();

    const cardTitle = this.titleTextArea.value;

    if (Util.isEmptyString(cardTitle)) return false

    const lastIndex = this.shadowRoot!.querySelectorAll('trello-card').length;

    const card = new Card(cardTitle, this.list._id, lastIndex)
    const result = await this.cardService.putOne(null, card);

    this.formAddTrelloCard.insertAdjacentHTML('beforebegin',
      `<trello-card 
        card='${JSON.stringify({ ...card, _id: result._id })}'
        card-title="${cardTitle}" 
        trello-list-index="${this.list.boardId}"
      ></trello-card>`);

    this.titleTextArea.value = '';
    this.titleTextArea.focus();
    this.listCardsNode.scrollTop = this.listCardsNode.clientHeight
    return false;
  };


  private autoGrowTextArea = (event: KeyboardEvent): void => {
    const element = event.target as HTMLElement
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
  }
}

if (!customElements.get('trello-list')) {
  customElements.define('trello-list', ListComponent);
}