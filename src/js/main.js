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
		ratio: 'data-ratio'
	},

	cssClass = {
		hidden: 'u-hidden'
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
	const
		entry = entries[0],
		methodName = (entry.isIntersecting)
			? 'remove'
			: 'add',
		feedback = document.querySelector(selector.feedback);
	if (feedback === null) {
		return;
	}

	if (entry.isIntersecting) {
		const
			ratio = (100 * entry.intersectionRatio).toFixed(1);
		feedback.setAttribute(attributeName.ratio, ratio);
	} else {
		feedback.removeAttribute(attributeName.ratio);
	}

	feedback.classList[methodName](cssClass.hidden);
}



/* ========================================================================== *\
	INITIALIZATION
\* ========================================================================== */

createObserver(onIntersectionChanged);
