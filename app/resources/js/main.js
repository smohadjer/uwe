import Navigation from './modules/nav.js';

//Helper classes to HTML for styling of nojs version
const html = document.querySelector('html');
html.classList.remove('no-js');
html.classList.add('js');

//taken from http://youmightnotneedjquery.com/
function ready(fn) {
	'use strict';

	if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

ready(function() {
	'use strict';

	console.log('DOM is ready!');

	//initialize navigation
	const nav = new Navigation({
		element: document.querySelector('header > nav')
	});

	//hamburger button
	const hamburger = document.querySelector('button.hamburger');
	if (hamburger) {
		hamburger.addEventListener('click', function() {
			hamburger.classList.toggle('is-active');
			if (nav.el) {
				nav.el.classList.toggle('is-visible');
			}
		});
	}
});
