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
		index: 'data-index',
		source: 'data-src'
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

	// Iterate over all the intersecting items and replace their image src.
	activeItem.forEach(item => {
		const
			image = item.target;

		// Log a line in the console to show for which element the src attribute
		// will be set.
		// eslint-disable-next-line
		console.log(`Updating img src for image #${ image.getAttribute(attributeName.index) }`);

		image.src = image.getAttribute(attributeName.source);

		// Uncomment this line to remove the image from the observer. Now each
		// image will only be processed once.
		// observer.unobserve(item.target);
	});
}


/* ========================================================================== *\
	INITIALIZATION
\* ========================================================================== */

createObserver(onIntersectionChanged);
