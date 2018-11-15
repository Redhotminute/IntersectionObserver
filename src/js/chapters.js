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
	attributeName = {
		title: 'data-title'
	},

	selector = {
		feedback: '.js-feedback'
	};



/* ========================================================================== *\
	EVENT HANDLING
\* ========================================================================== */

/**
 *
 *
 * @param {Array<IntersectionObserverEntry>} entries
 */
function onIntersectionChanged(entries) {
	// Filter the entries so only those which represent elements which are
	// currently intersecting remain. It is possible there are no intersecting
	// elements when the scroll position is such that the margin between two
	// chapters is in the center of the screen.
	const
		activeItems = entries.filter(entry => entry.isIntersecting);
	if (activeItems.length === 0) {
		return;
	}

	// Update the active chapter title.
	setFeedback(activeItems[0].target.getAttribute(attributeName.title));
}



/* ========================================================================== *\
	PRIVATE METHODS
\* ========================================================================== */

/**
 *
 *
 * @param {string} text The text to display.
 */
function setFeedback(text) {
	const
		feedback = document.querySelector(selector.feedback);
	if (feedback !== null
	) {
		feedback.textContent = text;
	}
}



/* ========================================================================== *\
	INITIALIZATION
\* ========================================================================== */

createObserver(onIntersectionChanged);
