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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
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
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = __webpack_require__(0);
const card_template_1 = __webpack_require__(1);
const card_model_1 = __webpack_require__(2);
__webpack_require__(19);
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)(undefined);
// imports


// module
exports.push([module.i, ".yRnZaxp_u7OWmk1vDuXQ6 {\n    overflow: hidden;\n    padding: 6px 6px 2px 8px;\n    position: relative;\n    background-color: #fff;\n    border-bottom: 1px solid #ccc;\n    border-radius: 3px;\n    cursor: pointer;\n    display: block;\n    margin-bottom: 6px;\n    max-width: 300px;\n    min-height: 20px;\n    position: relative;\n    text-decoration: none;\n    z-index: 10;\n  }\n  \n  .yRnZaxp_u7OWmk1vDuXQ6:hover {\n    background-color: #edeff0;\n    border-bottom-color: #d6dadc\n  }\n  \n  ._3TVzO5WTTPMEiqQjOruLQn {\n    pointer-events: none\n  }\n  .AXIYSp27y9n7IVjHg2hyQ {\n    transform: rotate(7deg);\n  }\n  \n  .GIfiDU2HRmj3AxRHvin-R {\n    clear: both;\n    display: block;\n    margin: 0 0 4px;\n    overflow: hidden;\n    text-decoration: none;\n    word-wrap: break-word;\n    color: #4d4d4d;\n  }\n  \n  ._35mNavFn9RkAT1PjTUogw7 {\n    padding: 6px 6px 2px 8px;\n    background-color: #fff;\n    margin-bottom: 6px;\n  }\n  \n  ._1Kuod6pIB7aa_0K42KQ6HH {\n    overflow: hidden;\n    background-color: #fff;\n    border-radius: 3px;\n    padding: 0;\n    display: block;\n    max-width: 300px;\n    position: relative;\n    text-decoration: none;\n    z-index: 0;\n    word-wrap: break-word; \n    resize: none;\n    height: 54px;\n    background: #fff;\n    border: none;\n    box-shadow: none;\n    margin-bottom: 4px;\n    max-height: 162px;\n    min-height: 54px;\n    overflow-y: auto;\n    width: 100%;\n  }\n  \n  ._1Kuod6pIB7aa_0K42KQ6HH:focus {\n    outline: 0\n  }\n  \n  \n  ", ""]);

// exports
exports.locals = {
	"card": "yRnZaxp_u7OWmk1vDuXQ6",
	"card-content": "_3TVzO5WTTPMEiqQjOruLQn",
	"cardContent": "_3TVzO5WTTPMEiqQjOruLQn",
	"card-rotate": "AXIYSp27y9n7IVjHg2hyQ",
	"cardRotate": "AXIYSp27y9n7IVjHg2hyQ",
	"card-title": "GIfiDU2HRmj3AxRHvin-R",
	"cardTitle": "GIfiDU2HRmj3AxRHvin-R",
	"wrapper-card-title": "_35mNavFn9RkAT1PjTUogw7",
	"wrapperCardTitle": "_35mNavFn9RkAT1PjTUogw7",
	"inp-card-title": "_1Kuod6pIB7aa_0K42KQ6HH",
	"inpCardTitle": "_1Kuod6pIB7aa_0K42KQ6HH"
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ })
/******/ ]);
//# sourceMappingURL=card.8cf4a17ad40189d4149c.js.map