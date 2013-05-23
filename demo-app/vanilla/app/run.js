(function(curl) {

	curl.config({
		main: 'app/main',
		packages: {
			curl:  { location: '../components/curl/src/curl' },
			when:  { location: '../components/when', main: 'when' },
			model: { location: '../common/model' },
			dom:   { location: '../common/dom' },
			data:  { location: '../common/data' }
		}
	});

}(curl));