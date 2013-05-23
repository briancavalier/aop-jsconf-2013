(function(define) {
define(function(require) {

	var render = require('./render');

	return function renderList(template, list) {
		var wrapper, container, itemTemplate;

		wrapper = document.createElement('div');
		wrapper.innerHTML = template;
		container = wrapper.firstChild;
		itemTemplate = container.innerHTML;

		container.innerHTML = list.reduce(function(html, item) {
			return html + render(itemTemplate, item);
		}, '');

		return wrapper.innerHTML;
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
