(function(define) {
define(function() {

	var templateRx, undef;

	templateRx = /\{\{([^\s\}]+)\}\}/g

	return function render(template, item) {
		return template.replace(templateRx, function(s, key) {
			return item && item[key] !== undef ? item[key] : '';
		});
	}
});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));
