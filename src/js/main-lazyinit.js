/* ========================================================================== *\
	IMPORTS
\* ========================================================================== */

import {
	registerModule
} from './lazyinit.js';



/* ========================================================================== *\
	PRIVATE VARIABLES
\* ========================================================================== */

const
	moduleName = 'lazy-test',

	cssClass = {
		active: 'is-active'
	};



/* ========================================================================== *\
	PRIVATE METHODS
\* ========================================================================== */

/**
 *
 *
 * @param {HTMLElement} element
 */
function createInstanceForElement(element) {
	// eslint-disable-next-line
	console.log('create an instance of "lazy-test" for ', element);
	element.classList.add(cssClass.active);
}



/* ========================================================================== *\
	INITIALIZATION
\* ========================================================================== */

/**
 *
 */
function init() {
	registerModule(moduleName, createInstanceForElement);
}

init();
