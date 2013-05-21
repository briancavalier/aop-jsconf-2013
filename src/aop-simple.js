var slice = Function.prototype.call.bind([].slice);

// Very simple advice functions
module.exports = {
	before: before,
	afterReturning: afterReturning,
	afterThrowing: afterThrowing,
	after: after,
	around: around
};

function before(f, advice) {
	return function() {
		advice.apply(this, arguments);
		return f.apply(this, arguments);
	}
}

function afterReturning(f, advice) {
	return function() {
		return advice.call(this, f.apply(this, arguments));
	}
}

function afterThrowing(f, advice) {
	return function() {
		try {
			return f.apply(this, arguments);
		} catch(e) {
			return advice(e);
		}
	}
}

function after(f, advice) {
	return function() {
		var result;
		try {
			result = f.apply(this, arguments);
		} catch(e) {
			result = e;
		}

		return advice.call(this, result)
	}
}

function around(f, advice) {
	return function() {
		return advice.call(this, f.bind(this), slice(arguments));
	}
}
