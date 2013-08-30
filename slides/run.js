/* @license Copyright (c) 2011-2013 Brian Cavalier */
(function(curl) {

	curl({
		main: 'main',
		paths: {
			'content': 'slides.md',
			'themes': 'css/themes'
		},
		packages: {
			curl: { location: '../bower_components/curl/src/curl' },
			when: { location: '../bower_components/when', main: 'when' },
			marked: { location: '../bower_components/marked', main: 'lib/marked' },
			highlightjs: { location: '../bower_components/highlightjs', main: 'highlight.pack.js' }
		}
	});

})(window.curl);