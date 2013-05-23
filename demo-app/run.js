(function(curl, window) {

	var variant = window.location.hash.slice(1) || 'vanilla';

	curl.config({
		main: variant + '/main',
		packages: {
			curl:  { location: 'components/curl/src/curl' },
			when:  { location: 'components/when', main: 'when' },
			meld:  { location: 'components/meld', main: 'meld' },
			'aop-simple': { location: '../src', main: 'aop-simple',
				config: { moduleLoader: 'curl/loader/cjsm11' }},
			model: { location: 'common/model' },
			dom:   { location: 'common/dom' },
			data:  { location: 'common/data' },
			template:  { location: 'common/template' }
		}
	});

}(curl, window));