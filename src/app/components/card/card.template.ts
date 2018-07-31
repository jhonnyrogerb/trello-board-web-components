import { Card } from '../card/card.model';

export const cardTemplate = (card: Card) => {
  return `
        <link href="dist/cardComponent.bundle.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"/>
        <div 
            class="card"
            draggable="true" 
            id="${card._id}"
        >   
            <span class="card__edit">
                <i class="fa fa-pencil"></i>
            </span>

            <div class="card__content">
                <div class="card__cover"></div>
                <div class="card__labels"></div>
                <span class="card__title">${card.title}</span>
                <div class="card__badges"></div>
                <div class="card__members"></div>
            </div>        
        </div>
    `;
};
