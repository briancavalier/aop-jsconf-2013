(function(curl, window) {

	var mainMap, main;

	mainMap = {
		'cujojs': 'wire!cujojs'
	};

	main = window.location.hash.slice(1) || 'vanilla';
	main = (main in mainMap ? mainMap[main] : main) + '/main';

	curl.config({
		main: main,
		packages: {
			curl:  { location: 'components/curl/src/curl' },
			when:  { location: 'components/when', main: 'when' },
			meld:  { location: 'components/meld', main: 'meld' },
			aop: { location: '../src', main: 'aop-simple',
				config: { moduleLoader: 'curl/loader/cjsm11' }},
			wire:  { location: 'components/wire', main: 'wire' },
			model: { location: 'common/model' },
			dom:   { location: 'common/dom' },
			data:  { location: 'common/data' },
			template:  { location: 'common/template' }
		}
	});

}(curl, window));