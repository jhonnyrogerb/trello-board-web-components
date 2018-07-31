import '../styles/base.scss';
import { BoardComponent } from './components/board/board.component';
import { CardComponent } from './components/card/card.component';
import { CardEditComponent } from './components/card-edit/card-edit.component';
import { ListComponent } from './components/list/list.component';

export const board = new BoardComponent();
export const card = new CardComponent();
export const list = new ListComponent();
export const cardEdit = new CardEditComponent();