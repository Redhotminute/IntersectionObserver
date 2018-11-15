/* ========================================================================== *\
	PRIVATE VARIABLES
\* ========================================================================== */

const
	attributeName = {
		options: 'data-intersection-options',
		useViewport: 'data-intersection-viewport'
	},

	cssClass = {
		intersectionRoot: 'js-intersection-root',
		target: 'js-intersection-target'
	},

	selectors = {
		rootElement: `.${ cssClass.intersectionRoot }`,
		target: `.${ cssClass.target }`
	};



/* ========================================================================== *\
	PRIVATE METHODS
\* ========================================================================== */

/**
 *
 *
 * @param {IntersectionObserver} observer
 * @param {HTMLElement} baseElement
 */
function addTargets(observer, baseElement) {
	const
		targets = document.querySelectorAll(selectors.target);
	targets.forEach(target => observer.observe(target));
}

/**
 *
 *
 * @param {HTMLElement} baseElement
 * @param {Function} callback
 */
function createIntersectionObserver(baseElement, callback) {
	const
		itemOptions = (baseElement.hasAttribute(attributeName.options))
			? JSON.parse(baseElement.getAttribute(attributeName.options))
			: {},
		root = (baseElement.hasAttribute(attributeName.useViewport))
			? null
			: baseElement,
		options = Object.assign(itemOptions, {
			root
		}),
		observer = new IntersectionObserver(callback, options);

	return observer;
}



/* ========================================================================== *\
	PUBLIC API
\* ========================================================================== */

/**
 *
 *
 * @param {function} callback
 *
 * @returns {IntersectionObserver}
 */
function createObserver(callback) {
	const
		baseElement = document.querySelector(selectors.rootElement);
	if (baseElement === null) {
		return;
	}

	const
		observer = createIntersectionObserver(baseElement, callback);
	addTargets(observer, baseElement);

	return observer;
}



/* ========================================================================== *\
	EXPORTS
\* ========================================================================== */

export {
	createObserver
};
