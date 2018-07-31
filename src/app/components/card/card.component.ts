import { Card } from './card.model';
import { cardTemplate } from './card.template';
import { Globals } from '../../../app/globals';
import { Util } from '../../../app/helpers/util';

import './card.component.scss';
import { PouchdbCardService } from '../../services/card.service';
import { PouchdbListService } from '../../services/list.service';
import { CardEditComponent } from '../card-edit/card-edit.component';



export class CardComponent extends HTMLElement {
  public title: string;
  public trelloListIndex: string
  public card: Card
  public cardNode: HTMLElement
  public cardContentNode: HTMLElement
  public btnEditCard: HTMLButtonElement;
  public formEditCard: HTMLFormElement;
  public cardTitle: HTMLElement;
  public startListId: string
  public startList: HTMLElement
  private cardService: PouchdbCardService;
  private listService: PouchdbListService;


  constructor() {
    super();
    this.ondragstart = this.onDragStart;
    this.ondragend = this.onDragEnd;
    this.ondragover = this.onDragOver;
    this.draggable = true;
    this.cardService = new PouchdbCardService();
    this.listService = new PouchdbListService();
  }


  public connectedCallback() {
    try {
      this.card = JSON.parse(this.getAttribute('card')!)
    } catch (e) {
      return
    }

    const template = cardTemplate(this.card);
    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(Util.stringToElement(template));

      this.btnEditCard = this.shadowRoot!.querySelector('.card__edit')! as HTMLButtonElement;
      this.cardNode = this.shadowRoot!.querySelector('.card')! as HTMLElement;
      this.cardContentNode = this.shadowRoot!.querySelector('.card__content')! as HTMLElement;
      this.formEditCard = this.shadowRoot!.querySelector('.form-add-trello-card') as HTMLFormElement;
      this.cardTitle = this.shadowRoot!.querySelector('.card__title')! as HTMLElement;
      this.btnEditCard .onclick = this.showCardEditForm;
    }
  }


  private onDragStart = (event: DragEvent): void => {
    Globals.draggableElement = this
    this.startListId = this.parentElement.getAttribute('list-id');
    this.startList = this.parentElement;

    setTimeout(() => {
      this.cardContentNode.style.visibility = 'hidden';
      this.cardNode.style.background = '#C1C8CB';
      this.btnEditCard.style.display = 'none';
    }, 100);

    event.dataTransfer.setData('text/html', this.innerHTML);
    event.dataTransfer.effectAllowed = 'move';
  };


  private onDragOver = (event: DragEvent): void => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';

    const parent = this.parentElement! as HTMLElement;
    const next = this.nextElementSibling as HTMLElement;
    const previous = this.previousElementSibling as HTMLElement;
    const first = parent.firstElementChild! as HTMLElement;
    const last = parent.lastElementChild! as HTMLElement;
    const initialHeight = parent.offsetHeight;

    if (!Util.isSameNodeName(Globals.draggableElement, "TRELLO-CARD")) {
      return;
    }

    if (Globals.previousTarget === this) {
      return;
    } else if (!Globals.previousTarget) {
      Globals.previousTarget = this;
    } else {
      Globals.previousTarget = null!;
    }

    if (!Globals.previousParent) {
      Globals.previousParent = parent;
    } else if (Globals.previousParent !== parent) {
      Globals.previousParent.style.removeProperty('min-height');
      Globals.previousParent = parent;
    }

    if (this !== Globals.draggableElement) {
      parent.style.minHeight = `${initialHeight}px`;

      if (first === Globals.draggableElement.parentElement!) {
        parent.insertBefore(this, Globals.draggableElement);
      } else if (first === this) {
        parent.insertBefore(Globals.draggableElement, this);
      } else if (last === Globals.draggableElement) {
        parent.insertBefore(Globals.draggableElement, this);
      } else if (last === this) {
        if (last.parentElement === Globals.draggableElement.parentElement) {
          parent.insertBefore(this, Globals.draggableElement);
        } else {
          parent.insertBefore(Globals.draggableElement, last);
        }
      } else {
        if (Globals.draggableElement === next) {
          parent.insertBefore(Globals.draggableElement, this);
        } else {
          parent.insertBefore(Globals.draggableElement, next);
        }
      }

      this.cardNode.style.removeProperty("background");
    }
  };


  private onDragEnd = async (event: DragEvent) => {
    event.preventDefault();
    const target = event.target as CardComponent;

    const endListId = target.parentElement.getAttribute('list-id');
    const endList = target.parentElement;

    Array.from(endList.querySelectorAll('trello-card')).forEach((element, index) => {
      const trelloCard = element as CardComponent;

      trelloCard.card = { ...trelloCard.card, listIndex: index, listId: endListId };
      this.cardService.putOne(trelloCard.card._id, trelloCard.card);
    });

    if (endListId !== this.startListId) {
      Array.from(this.startList.querySelectorAll('trello-card')).forEach((element, index) => {
        const trelloCard = element as CardComponent;

        trelloCard.card = { ...trelloCard.card, listIndex: index };
        if (trelloCard.card._id !== this.card._id) {
          this.cardService.putOne(trelloCard.card._id, trelloCard.card);
        }
      });
    }

    this.cardContentNode.style.removeProperty("visibility");
    this.cardNode.style.removeProperty("background");
    this.btnEditCard.style.removeProperty("display");
  };


  private autoGrow = (event: KeyboardEvent): void => {
    const element = event.target as HTMLElement

    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
  }


  private showCardEditForm = (event: MouseEvent) =>{
    event.preventDefault();

    const top = this.getOffset(this).top;
    const left = this.getOffset(this).left;
    const cardEditComponent = new CardEditComponent();

    cardEditComponent.setAttribute('top', top);
    cardEditComponent.setAttribute('left', left);
    cardEditComponent.setAttribute('card',`${JSON.stringify(this.card)}`);
    document.body.insertAdjacentElement('beforeend', cardEditComponent);

    cardEditComponent.addEventListener('onsave', (customEvent: CustomEvent) => {
      this.cardTitle.textContent = customEvent.detail.title;
      this.card.title = customEvent.detail.title;
      this.cardService.putOne(this.card._id, this.card)
    })
  }


  private getOffset(el) {
    el = el.getBoundingClientRect();
    return {
      left: el.left + window.scrollX,
      top: el.top + window.scrollY
    }
  }
  
}

if (!customElements.get('trello-card')) {
  customElements.define('trello-card', CardComponent);
}
