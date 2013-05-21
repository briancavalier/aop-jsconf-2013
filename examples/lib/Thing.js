module.exports = Thing;

function Thing() {}

Thing.prototype = {
	doStuff: function(x) {
		if(x < 0) {
			throw new Error('dont\'t be so negative');
		}
		return x + 1;
	}
};
