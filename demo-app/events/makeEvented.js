(function(define) {
define(function() {

	var slice, evented;

	slice = Function.prototype.call.bind([].slice);

	evented = {
		on: function(topic, handler) {
			var handlers, topics;

			topics = this.events;
			handlers = topics[topic];

			if(!handlers) {
				handlers = topics[topic] = [];
			}

			handlers.push(handler);

			return function() {
				var index = handlers.indexOf(handler);
				if(index > -1) {
					handlers.splice(index, 1);
					if(handlers.length === 0) {
						delete topics[topic];
					}
				}
			};
		},

		emit: function(topic /*...args*/) {
			var handlers, args;

			handlers = this.events[topic];
			args = slice(arguments, 1);

			if(handlers) {
				handlers.forEach(function(handler) {
					handler.apply(null, args);
				});
			}
		}
	};

	return function makeEvented(obj) {
		obj.events = {};
		Object.keys(evented).forEach(function(prop) {
			obj[prop] = evented[prop];
		});

		return obj;
	};
});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));
