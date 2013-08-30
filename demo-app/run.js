(function(curl, window) {

	var mainMap, main;

	mainMap = {
		'cujojs-1': 'wire!',
		'cujojs-2': 'wire!'
	};

	main = window.location.hash.slice(1) || 'vanilla';
	main = (main in mainMap ? (mainMap[main] + main) : main) + '/main';

	curl.config({
		// Main module id to kick off the app
		main: main,
		// For fun, we can introduce Cart errors using CartFail
//		paths: { 'model/Cart': 'common/model/CartFail' },
		// AMD packages. Note we're loading aop-simple as pure CommonJS
		packages: {
			curl:  { location: '../bower_components/curl/src/curl' },
			when:  { location: '../bower_components/when', main: 'when' },
			meld:  { location: '../bower_components/meld', main: 'meld' },
			aop:   { location: '../src', main: 'aop-simple',
				config: { moduleLoader: 'curl/loader/cjsm11' }},
			wire:  { location: '../bower_components/wire', main: 'wire' },
			model: { location: 'common/model' },
			dom:   { location: 'common/dom' },
			data:  { location: 'common/data' },
			template:  { location: 'common/template' }
		}
	});

}(curl, window));