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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ 1:
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

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(17);


/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = __webpack_require__(0);
const card_template_1 = __webpack_require__(1);
const card_model_1 = __webpack_require__(2);
__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./card.component.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
class CardWebComponent extends HTMLElement {
    constructor() {
        super();
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
        this.onCardDragStart = (ev) => {
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
        this.ondragstart = this.onCardDragStart;
        this.draggable = true;
    }
    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = card_template_1.cardTemplate(new card_model_1.Card('Card1', 0));
        shadowRoot.appendChild(this.htmlToElements(template));
    }
    htmlToElements(html) {
        const template = document.createElement('template');
        template.innerHTML = html;
        return template.content;
    }
}
exports.CardWebComponent = CardWebComponent;
customElements.define('trello-card', CardWebComponent);


/***/ }),

/***/ 2:
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


/***/ })

/******/ });
//# sourceMappingURL=card.246c82b4cbca8a51aa24.js.map