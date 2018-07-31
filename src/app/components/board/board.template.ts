import { List } from '../list/list.model';
import { listTemplate } from '../list/list.template';
import { Board } from './board.model';

export const boardTemplate = (board: Board) => {
    return `
    <link href="dist/boardComponent.bundle.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />            
    
        <div class="board-root">
            <header>
                <a href="#" class="board-title">${board.name}</a>
                <a href="#" class="board-favorite">
                    <i class="fa fa-star-o" aria-hidden="true"></i>                
                </a>
            </header>
            <div class="board-canvas">
                <div class="board-wrapper">
                    <div class="board">
                        ${board.lists.map(list => `
                            <trello-list list='${JSON.stringify(list)}'>
                            </trello-list>`
                        ).join('')}
                        <div class="list-form-add-list">
                            <div class="list add-list">
                                <button class="btn-show-form">Adicionar uma lista...</button>
                                <form class="form-add-list">
                                    <input placeholder="Adicionar uma lista..." type="text"class="inp-list-name">
                                    <button class="btn-add-list">Salvar</button>
                                    <a href="#" class="btn-hide-form">
                                        <i class="fa fa-times" aria-hidden="true"></i>                            
                                    </a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
        `;
};
