/* ========================================================================== *\
	IMPORTS
\* ========================================================================== */

import {
	createObserver
} from './observer.js';



/* ========================================================================== *\
	PRIVATE VARIABLES
\* ========================================================================== */

const
	observer = createObserver(onIntersectionChanged),

	registeredModules = new Map(),

	attributeName = {
		lazyModule: 'data-lazy-module'
	};



/* ========================================================================== *\
	EVENT HANDLING
\* ========================================================================== */

/**
 *
 *
 * @param {Array<IntersectionObserverEntry>} entries
 * @param {IntersectionObserver} observer
 */
function onIntersectionChanged(entries, observer) {
	// Filter the entries so only those which represent elements which are
	// currently intersecting remain.
	const
		activeItem = entries.filter(entry => entry.isIntersecting);

	// Iterate over all the intersecting items and call the registered factory
	// method for each.
	activeItem.forEach(item => {
		// When the module for the element has been initialized, remove the
		// element as a target from the observer.
		if (initializeElementModule(item.target)) {
			observer.unobserve(item.target);
		}
	});
}



/* ========================================================================== *\
	PRIVATE METHODS
\* ========================================================================== */

/**
 *
 * @param {HTMLElement} element
 */
function initializeElementModule(element) {
	// Get the module name and make sure it belongs to a registered type.
	const
		moduleName = element.getAttribute(attributeName.lazyModule);
	if (!registeredModules.has(moduleName)) {
		return false;
	}

	// Get the factory method and call it with the current elment.
	const
		factoryMethod = registeredModules.get(moduleName);
	factoryMethod(element);

	return true;
}



/* ========================================================================== *\
	PUBLIC API
\* ========================================================================== */

/**
 *
 *
 * @param {string} moduleName
 * @param {Function} factoryMethod
 *
 * @returns {boolean}
 */
function registerModule(moduleName, factoryMethod) {
	// When the module name is already in use don't register it again.
	if (registeredModules.has(moduleName)) {
		return false;
	}

	// Register the module.
	registeredModules.set(moduleName, factoryMethod);

	// Find all elements which have the module name assigned to the data
	// attribute for the lazy init and add those elements to the observer as a
	// target.
	const
		elements = document.querySelectorAll(`[${ attributeName.lazyModule }*="${ moduleName }"]`);
	elements.forEach(element => observer.observe(element));

	return true;
}



/* ========================================================================== *\
	EXPORTS
\* ========================================================================== */

export {
	registerModule
}
