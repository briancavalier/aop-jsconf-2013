/* @license Copyright (c) 2011-2013 Brian Cavalier */
define([
	'require',
	'lib/ArrayPresentationModel',
	'lib/SlideView',
	'lib/PresentationController',
	'lib/tx/compose',
	'lib/tx/fetch',
	'lib/tx/markdown',
	'lib/tx/highlight',
	'lib/tx/split',
	'css!highlightjs/styles/ir_black.css',
	'css!themes/black/theme.css',
	'css!themes/fade.css',
	'domReady!'
],
	function (require, Model, View, Controller, compose, fetch, markdown, highlight, split) {
		var source, model, view, controller, splitSlides;

		splitSlides = /\s*\<hr\s*\/?\>\s*/i;
		source = compose(
			fetch(require),
			markdown({ highlight: highlight }),
			split(splitSlides)
		);

		model = new Model(source('content'));
		view = new View(document.getElementById('slide-container'), model);
		controller = new Controller(view);

		controller.start().then(function () {
			document.body.className = '';
		});
	}
);
