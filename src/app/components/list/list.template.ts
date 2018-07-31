import { cardTemplate } from '../card/card.template';
import { List } from '../list/list.model';

export const listTemplate = (list: List) => {
    return `
            <link href="dist/listComponent.bundle.css" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />            

            <div class="list-wrapper">
                <div 
                    class="list" id="${list._id}" 
                    data-list-index="${list.boardIndex}"
                >   
                    <div class="list-content">
                        <header class="list__header">
                            <h2 class="list__title">${list.title}</h2>
                            <div class="list__menu"></div>
                        </header>
                        <div class="list-cards" list-id="${list._id}">
                            ${list.cards.map(card => `
                                <trello-card
                                    card='${JSON.stringify(card)}'
                                    card-title="${card.title}" 
                                    trello-list-index="${card.listId}"
                                >
                                </trello-card>
                            `).join('')}   
                            <form class="form-add-trello-card">
                                <textArea class="trello-card-title"></textArea>
                                <button class="btn-add-trello-card">Adicionar</button>
                                <a href="#" class="btn-hide-form">
                                    <i class="fa fa-times" aria-hidden="true"></i>                            
                                </a>
                            </form>                      
                        </div>
                        <a href="#" class="btn-show-form">
                            Adicionar um cartão...
                        </a>
                    </div>
                </div>
            </div>
        `;
};
