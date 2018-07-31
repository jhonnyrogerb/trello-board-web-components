import { Card } from '../card/card.model';

export const cardEditTemplate = (card: Card) => {
  return `
        <link href="dist/cardEditComponent.bundle.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"/>
        <div class="form-overlay"></div>
        <form class="form-add-trello-card">
            <textArea class="trello-card-title">${card.title}</textArea>
            <button class="btn-add-trello-card">Salvar</button>
        </form>
    `;
};
