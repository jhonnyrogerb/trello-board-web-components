import { Card } from '../card/card.model';
import { cardEditTemplate } from './card-edit.template';
import { Globals } from '../../../app/globals';
import { Util } from '../../../app/helpers/util';

import './card-edit.component.scss';
import { PouchdbCardService } from '../../services/card.service';
import { PouchdbListService } from '../../services/list.service';



export class CardEditComponent extends HTMLElement {
  public cardText: string;
  public card: Card;
  public btnHideForm: HTMLButtonElement;
  public titleTextArea: HTMLTextAreaElement;
  public formAddTrelloCard: HTMLFormElement;
  public btnSaveForm: HTMLButtonElement;
  public onSave: CustomEvent

  
  constructor() {
    super();
  }


  public connectedCallback() {
    try {
      this.card = JSON.parse(this.getAttribute('card')!)
    } catch (e) {
      return
    }

    const template = cardEditTemplate(this.card);

    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(Util.stringToElement(template));

      (this.shadowRoot!.querySelector('.form-add-trello-card') as HTMLElement)!.style.top = `${this.getAttribute('top')}px`;
      (this.shadowRoot!.querySelector('.form-add-trello-card') as HTMLElement)!.style.left = `${this.getAttribute('left')}px`;
      this.btnHideForm = this.shadowRoot!.querySelector('.form-overlay')! as HTMLButtonElement;
      this.btnSaveForm = this.shadowRoot!.querySelector('.btn-add-trello-card')! as HTMLButtonElement;
      this.formAddTrelloCard = this.shadowRoot!.querySelector('.form-add-trello-card')! as HTMLFormElement
      this.titleTextArea = this.formAddTrelloCard.querySelector('.trello-card-title')! as HTMLTextAreaElement;

      this.btnHideForm.onclick = this.closeForm;
      this.btnSaveForm.onclick = this.saveForm;
      this.titleTextArea.onkeyup = this.autoGrowTextArea
      document.onkeydown = this.closeFormOnEsc;

      setTimeout(() => {
        this.titleTextArea.dispatchEvent(new KeyboardEvent('keyup'));
        const tempVal = this.titleTextArea.textContent;
        this.titleTextArea.textContent = '';
        this.titleTextArea.focus();
        this.titleTextArea.textContent = tempVal;
      }, 50)
    }
  }


  private closeFormOnEsc = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      this.remove();
    }

    if (event.keyCode === 13) {
      this.onSave = new CustomEvent('onsave', { detail: { title: this.titleTextArea.value } });
      this.dispatchEvent(this.onSave);
      this.remove();
    }
  }


  private closeForm = (evnet: Event) => {
    this.remove();
  }

  saveForm = (event: Event) => {
    this.onSave = new CustomEvent('onsave', { detail: { title: this.titleTextArea.value } });
    this.dispatchEvent(this.onSave);
    this.remove();
  }


  private autoGrowTextArea = (event: KeyboardEvent): void => {
    const element = event.target as HTMLElement
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";

    if (+this.getAttribute('top') + 50 + this.titleTextArea.offsetHeight > document.body.offsetHeight) {
      (this.shadowRoot!.querySelector('.form-add-trello-card') as HTMLElement)!.style.removeProperty('top');
      (this.shadowRoot!.querySelector('.form-add-trello-card') as HTMLElement)!.style.bottom = '0';
    } else {
      (this.shadowRoot!.querySelector('.form-add-trello-card') as HTMLElement)!.style.removeProperty('bottom');
      (this.shadowRoot!.querySelector('.form-add-trello-card') as HTMLElement)!.style.top = `${this.getAttribute('top')}px`;
    }
  }
}

if (!customElements.get('trello-card-edit')) {
  customElements.define('trello-card-edit', CardEditComponent);
}
