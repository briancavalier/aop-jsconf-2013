(function(define) {
define(function() {

	var topics, slice;

	topics = {};
	slice = Function.prototype.call.bind([].slice);

	return {
		publish: publish,
		subscribe: subscribe
	};

	function subscribe(topic, f) {
		var handlers = topics[topic];
		if(!handlers) {
			handlers = topics[topic] = [];
		}

		handlers.push(f);

		return function() {
			var index = handlers.indexOf(f);
			if(index > -1) {
				handlers.splice(index, 1);
			}
		};
	}

	function publish(topic /*...args*/) {
		var handlers, args;

		handlers = topics[topic];
		args = slice(arguments, 1);

		if(handlers) {
			handlers.forEach(function(handler) {
				handler.apply(null, args);
			});
		}
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));
