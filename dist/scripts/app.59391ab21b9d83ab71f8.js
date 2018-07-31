var App =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Globals;
(function (Globals) {
    Globals.btnShowFormNode = document.getElementById('btn-show-form');
    Globals.btnHideFormNode = document.getElementById('btn-hide-form');
    Globals.formAddListNode = document.getElementById('form-add-list');
    Globals.btnaddListNode = document.getElementById('btn-save-list');
    Globals.boardNode = document.getElementById('board');
    Globals.inputListName = document.getElementById('inp-list-name');
})(Globals = exports.Globals || (exports.Globals = {}));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.cardTemplate = (card) => {
    return `
        <div 
            class="card" 
            draggable="true" 
            id="card-${Math.round(Math.random() * 1000)}"
            ondragstart="App.card.onCardDragStart('${card.boardIndex}',event)" 
            ondragend="App.card.onCardDragEnd(event)" 
            ondragover="App.card.onCardDragOver(event)"
        >   
            <div class="card-content">
                <div class="card-cover"></div>
                <div class="card-labels"></div>
                <span class="card-title">${card.title}</span>
                <div class="card-badges"></div>
                <div class="card-members"></div>
            </div>
        </div>
    `;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Card {
    constructor(title, boardIndex) {
        this.title = title;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.boardIndex = boardIndex;
    }
}
exports.Card = Card;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(5);
const globals_1 = __webpack_require__(0);
const board_component_1 = __webpack_require__(6);
const card_component_1 = __webpack_require__(13);
const list_component_1 = __webpack_require__(14);
const add_card_form_component_1 = __webpack_require__(16);
globals_1.Globals.btnShowFormNode = document.getElementById('btn-show-form');
globals_1.Globals.btnHideFormNode = document.getElementById('btn-hide-form');
globals_1.Globals.formAddListNode = document.getElementById('form-add-list');
globals_1.Globals.btnaddListNode = document.getElementById('btn-save-list');
globals_1.Globals.boardNode = document.getElementById('board');
globals_1.Globals.inputListName = document.getElementById('inp-list-name');
exports.board = new board_component_1.BoardComponent();
exports.card = new card_component_1.CardComponent();
exports.list = new list_component_1.ListComponent();
exports.addCardForm = new add_card_form_component_1.AddCardFormComponent();


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const list_model_1 = __webpack_require__(7);
const board_template_1 = __webpack_require__(8);
const card_model_1 = __webpack_require__(2);
const board_model_1 = __webpack_require__(12);
const globals_1 = __webpack_require__(0);
class BoardComponent {
    constructor(title) {
        let board = new board_model_1.Board('');
        let board1 = new list_model_1.List('Quadro 1', 0);
        board1.cards.push(new card_model_1.Card('Também é possível verificar a atividade do quadro, alterar a tela de fundo e muito mais.', 0));
        board1.cards.push(new card_model_1.Card('Os cartões fazem muitas coisas legais. Clique neste cartão para abrir e saber mais...', 0));
        board1.cards.push(new card_model_1.Card('Adicione membros a um quadro (via barra lateral) para colaborar, compartilhar e discutir. ', 0));
        let board2 = new list_model_1.List('Quadro 2', 1);
        board2.cards.push(new card_model_1.Card('Também 2 é possível verificar a atividade do quadro, alterar a tela de fundo e muito mais.', 0));
        board2.cards.push(new card_model_1.Card('Os 3 cartões fazem muitas coisas legais. Clique neste cartão para abrir e saber mais...', 0));
        board2.cards.push(new card_model_1.Card('Adicione 4 membros a um quadro (via barra lateral) para colaborar, compartilhar e discutir. ', 0));
        board.lists.push(board1);
        board.lists.push(board2);
        board.lists.push(board2);
        board.lists.push(board1);
        board_template_1.boardTemplate(board.lists);
        globals_1.Globals.boardNode.insertAdjacentHTML('beforeend', board_template_1.boardTemplate(board.lists));
    }
}
exports.BoardComponent = BoardComponent;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class List {
    constructor(title, index) {
        this.title = title;
        this.index = index;
        this.cards = [];
    }
}
exports.List = List;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const list_template_1 = __webpack_require__(9);
exports.boardTemplate = (lists) => {
    return `
        ${lists.map(list => `${list_template_1.listTemplate(list)}`).join('')}
    `;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const card_template_1 = __webpack_require__(1);
const list_header_template_1 = __webpack_require__(10);
const add_card_form_template_1 = __webpack_require__(11);
exports.listTemplate = (list) => {
    return `
            <div 
                class="list-wrapper"
                ondragover="App.list.onDragOver(event)"
                ondragend="App.list.onDragEnd(event)"                
            >
                <div 
                    class="list" id="list-${list.index}" 
                    data-list-index="${list.index}"
                    ondragstart="App.list.onDragStart(event)" 
                    draggable="true"                    
                >   
                    <div class="list-content">
                       ${list_header_template_1.listHeaderTemplate(list.title)}
                        <div class="list-cards">
                            ${list.cards
        .map(card => `${card_template_1.cardTemplate(card)}`)
        .join('')}
                        </div>
                        ${add_card_form_template_1.addCardFormTemplate(list.index)}
                    </div>
                </div>
            </div>
        `;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.listHeaderTemplate = (title) => {
    return ` 
        <header class="list__header">
            <h2 class="list__title">${title}</h2>
            <div class="list__menu"></div>
        </header>
    `;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.addCardFormTemplate = (listIndex) => {
    return `
        <form class="form-add-card">
            <div class="wrapper-card-title">
                <textArea 
                    class="inp-card-title"
                    onkeypress="App.addCardForm.addCardOnEnter('${listIndex}', event)"
                ></textArea>
            </div>
            <button 
                id="btn-add-card"
                onclick="App.addCardForm.addCard('${listIndex}', event)"
            >
                Salvar
            </button>
            <button 
                id="btn-hide-add-card-form" 
                onclick="App.addCardForm.hideForm('${listIndex}', event)"
            >
                Cancelar
            </button>
        </form>
        <a 
            href="javascript:void(0)" 
            class="btn-add-card"
            onclick="App.addCardForm.showForm('${listIndex}', event)"
        >
            Adicionar um cartão...
        </a>
    `;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Board {
    constructor(name) {
        this.name = name;
        this.lists = [];
    }
}
exports.Board = Board;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = __webpack_require__(0);
const card_template_1 = __webpack_require__(1);
const card_model_1 = __webpack_require__(2);
class CardComponent {
    constructor() {
        this.showAddCardForm = (index, event) => {
            event.preventDefault();
            event.stopPropagation();
            let boardNode = globals_1.Globals.boardNode.querySelector(`#list-${index}`);
            let formNode = boardNode.querySelector('.form-add-card');
            let titleNode = formNode.querySelector('.inp-card-title');
            titleNode.focus();
            formNode.style.display = 'block';
            return false;
        };
        this.hideAddCardForm = (index, event) => {
            event.preventDefault();
            let boardNode = globals_1.Globals.boardNode.querySelector(`#list-${index}`);
            let formNode = boardNode.querySelector('.form-add-card');
            formNode.style.display = 'none';
            return false;
        };
        this.addCardOnEnter = (index, event) => {
            if (event.keyCode === 13) {
                this.addCard(index, event);
            }
            return false;
        };
        this.addCard = (index, event) => {
            event.preventDefault();
            let boardNode = globals_1.Globals.boardNode.querySelector(`#list-${index}`);
            let formNode = boardNode.querySelector('.form-add-card');
            let titleNode = formNode.querySelector('.inp-card-title');
            let boardListNone = boardNode.querySelector('.list-cards');
            let card = new card_model_1.Card(titleNode.value, index);
            boardListNone.insertAdjacentHTML('beforeend', card_template_1.cardTemplate(card));
            titleNode.value = '';
            this.hideAddCardForm(index, event);
            return false;
        };
        this.onCardDragStart = (index, ev) => {
            let event = ev;
            const target = ev.target;
            globals_1.Globals.draggableElement = target;
            event.dataTransfer.setData('text/html', target.innerHTML);
            event.dataTransfer.effectAllowed = 'move';
        };
        this.onCardDragOver = (ev) => {
            let event = ev;
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
            const target = ev.target;
            const parent = target.parentElement;
            const next = target.nextElementSibling;
            const previous = target.previousElementSibling;
            const first = parent.firstElementChild;
            const last = parent.lastElementChild;
            if (!globals_1.Globals.draggableElement.parentElement.classList.contains('list-cards')) {
                return;
            }
            globals_1.Globals.draggableElement.style.background = '#C1C8CB';
            let cardConten = globals_1.Globals.draggableElement.getElementsByClassName('card-content')[0];
            cardConten.style.visibility = 'hidden';
            if (!globals_1.Globals.previousTarget) {
                globals_1.Globals.previousTarget = target;
            }
            if (globals_1.Globals.previousTarget == target) {
                return;
            }
            else {
                globals_1.Globals.previousTarget = null;
            }
            if (target && target !== globals_1.Globals.draggableElement) {
                if (first === globals_1.Globals.draggableElement.parentElement) {
                    parent.insertBefore(target, globals_1.Globals.draggableElement);
                    target.style.background = '#fff';
                }
                else if (first === target) {
                    parent.insertBefore(globals_1.Globals.draggableElement, first);
                    target.style.background = '#fff';
                }
                else if (last === globals_1.Globals.draggableElement) {
                    parent.insertBefore(globals_1.Globals.draggableElement, target);
                    target.style.background = '#fff';
                }
                else if (last === target) {
                    if (last.parentElement === globals_1.Globals.draggableElement.parentElement) {
                        parent.insertBefore(last, globals_1.Globals.draggableElement);
                        target.style.background = '#fff';
                    }
                    else {
                        parent.insertBefore(globals_1.Globals.draggableElement, last);
                        target.style.background = '#fff';
                    }
                }
                else {
                    if (globals_1.Globals.draggableElement == next) {
                        parent.insertBefore(globals_1.Globals.draggableElement, target);
                        target.style.background = '#fff';
                    }
                    else {
                        parent.insertBefore(globals_1.Globals.draggableElement, next);
                        target.style.background = '#fff';
                    }
                }
            }
        };
        this.onCardDragEnd = (ev) => {
            ev.preventDefault();
            let element = ev.target;
            element.style.background = '#fff';
            let cardConten = element.getElementsByClassName('card-content')[0];
            cardConten.style.visibility = 'visible';
        };
    }
}
exports.CardComponent = CardComponent;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = __webpack_require__(0);
const util_1 = __webpack_require__(15);
class ListComponent {
    constructor() {
        this.onDragStart = (ev) => {
            let event = ev;
            const target = ev.target;
            globals_1.Globals.draggableElement = target;
            event.dataTransfer.setData('text/html', target.innerHTML);
            event.dataTransfer.effectAllowed = 'move';
        };
        this.onDragOver = (ev) => {
            let event = ev;
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
            const target = ev.target;
            if (!util_1.Util.hasClass(globals_1.Globals.draggableElement, 'card')) {
                document.querySelectorAll('.list').forEach(element => {
                    let e = element;
                    e.style.zIndex = '-1';
                });
            }
            if (util_1.Util.hasClass(globals_1.Globals.draggableElement, 'list')) {
                if (!target.classList.contains('list-wrapper')) {
                    return;
                }
                const parent = target.parentElement;
                const next = target.nextElementSibling;
                const previous = target.previousElementSibling;
                const grandpa = parent.parentElement;
                const first = parent.querySelector('.list-wrapper');
                const last = parent.lastElementChild;
                if (util_1.Util.hasClass(parent, 'board')) {
                    globals_1.Globals.draggableElement.style.background = 'rgba(0, 0, 0, .2)';
                    let listContentNode = globals_1.Globals.draggableElement.querySelector('.list-content');
                    listContentNode.style.visibility = 'hidden';
                    if (target && target !== globals_1.Globals.draggableElement.parentElement) {
                        if (first === globals_1.Globals.draggableElement.parentElement) {
                            parent.insertBefore(target, globals_1.Globals.draggableElement.parentElement);
                        }
                        else if (first === target) {
                            parent.insertBefore(globals_1.Globals.draggableElement.parentElement, target);
                        }
                        else if (last === globals_1.Globals.draggableElement.parentElement) {
                            parent.insertBefore(globals_1.Globals.draggableElement.parentElement, target);
                        }
                        else {
                            if (globals_1.Globals.draggableElement.parentElement == next) {
                                parent.insertBefore(globals_1.Globals.draggableElement.parentElement, target);
                            }
                            else {
                                parent.insertBefore(globals_1.Globals.draggableElement.parentElement, next);
                            }
                        }
                    }
                }
            }
            if (util_1.Util.hasClass(globals_1.Globals.draggableElement, 'card')) {
                if (!target.getElementsByClassName('list-cards').length) {
                    return;
                }
                globals_1.Globals.draggableElement.style.background = '#C1C8CB';
                let cardConten = globals_1.Globals.draggableElement.getElementsByClassName('card-content')[0];
                cardConten.style.visibility = 'hidden';
                target
                    .getElementsByClassName('list-cards')[0]
                    .insertAdjacentElement('beforeend', globals_1.Globals.draggableElement);
            }
        };
        this.onDragEnd = (ev) => {
            ev.preventDefault();
            let element = ev.target;
            document.querySelectorAll('.list').forEach(element => {
                let e = element;
                e.style.zIndex = '10';
            });
            if (util_1.Util.hasClass(globals_1.Globals.draggableElement, 'list')) {
                globals_1.Globals.draggableElement.style.background = '#E1E3E5';
                let listContentNode = globals_1.Globals.draggableElement.querySelector('.list-content');
                listContentNode.style.visibility = 'visible';
            }
        };
    }
}
exports.ListComponent = ListComponent;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Util {
    constructor() { }
}
Util.hasClass = (element, selector) => {
    if (!element)
        return;
    return element.classList.contains(selector);
};
exports.Util = Util;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = __webpack_require__(0);
const card_template_1 = __webpack_require__(1);
const card_model_1 = __webpack_require__(2);
class AddCardFormComponent {
    constructor() {
        this.showForm = (index, event) => {
            event.preventDefault();
            event.stopPropagation();
            let boardNode = globals_1.Globals.boardNode.querySelector(`#list-${index}`);
            let formNode = boardNode.querySelector('.form-add-card');
            let titleNode = formNode.querySelector('.inp-card-title');
            titleNode.focus();
            formNode.style.display = 'block';
            return false;
        };
        this.hideForm = (index, event) => {
            event.preventDefault();
            let boardNode = globals_1.Globals.boardNode.querySelector(`#list-${index}`);
            let formNode = boardNode.querySelector('.form-add-card');
            formNode.style.display = 'none';
            return false;
        };
        this.addCardOnEnter = (index, event) => {
            if (event.keyCode === 13) {
                this.addCard(index, event);
            }
            return false;
        };
        this.addCard = (index, event) => {
            event.preventDefault();
            let boardNode = globals_1.Globals.boardNode.querySelector(`#list-${index}`);
            let formNode = boardNode.querySelector('.form-add-card');
            let titleNode = formNode.querySelector('.inp-card-title');
            let boardListNone = boardNode.querySelector('.list-cards');
            let card = new card_model_1.Card(titleNode.value, index);
            boardListNone.insertAdjacentHTML('beforeend', card_template_1.cardTemplate(card));
            titleNode.value = '';
            this.hideForm(index, event);
            return false;
        };
    }
}
exports.AddCardFormComponent = AddCardFormComponent;


/***/ })
/******/ ]);
//# sourceMappingURL=app.59391ab21b9d83ab71f8.js.map