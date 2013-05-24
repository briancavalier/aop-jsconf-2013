/* @license Copyright (c) 2011-2013 Brian Cavalier */
(function(curl) {

	curl({
		main: 'main',
		paths: {
			'content': '../README.md',
			'themes': 'css/themes'
		},
		packages: {
			curl: { location: '../components/curl/src/curl' },
			when: { location: '../components/when', main: 'when' },
			marked: { location: '../components/marked', main: 'lib/marked' },
			highlightjs: { location: '../components/highlightjs', main: 'highlight.pack.js' }
		}
	});

})(window.curl);