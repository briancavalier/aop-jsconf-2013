var slice = Function.prototype.call.bind([].slice);

// Very simple advice functions
module.exports = {
	before: before,
	afterReturning: afterReturning,
	afterThrowing: afterThrowing,
	after: after,
	around: around
};

/**
 * Call advice before f, with the same arguments
 * @param  {function} f function to advise
 * @param  {function} advice function to call before f
 * @return {function} advised function that will call advice before f
 */
function before(f, advice) {
	return function() {
		advice.apply(this, arguments); // ingore advice's return value
		return f.apply(this, arguments);
	};
}

/**
 * Call advice with f's return value, after f returns successfully
 * @param  {function} f function to advise
 * @param  {function} advice function to call after f returns
 * @return {function} advised function that will call advice after f returns
 */
function afterReturning(f, advice) {
	return function() {
		var result = f.apply(this, arguments);
		advice.call(this, result);

		return result;
	};
}

/**
 * Call advice with exception thrown by f, if f throws
 * @param  {function} f function to advise
 * @param  {function} advice function to call after f throws
 * @return {function} advised function that will call advice after f throws
 */
function afterThrowing(f, advice) {
	return function() {
		try {
			return f.apply(this, arguments);
		} catch(e) {
			advice.call(this, e);
			throw e;
		}
	};
}

/**
 * Call advice after f returns or throws
 * @param  {function} f function to advise
 * @param  {[type]} advice funciton to call after f returns or throws
 * @return {function} advised function that will call advice after f returns or throws
 */
function after(f, advice) {
	return function() {
		var result, threw;
		try {
			result = f.apply(this, arguments);
		} catch(e) {
			threw = true;
			result = e;
		}

		advice.call(this, result);
		if(threw) {
			throw result;
		} else {
			return result;
		}
	};
}

/**
 * Call advice "around" f: passes f and f's arguments to advice, which
 * can then do some work, call f, then do more work .. thus "around".
 * @param  {[type]} f      [description]
 * @param  {[type]} advice [description]
 * @return {[type]}        [description]
 */
function around(f, advice) {
	return function() {
		// Use bind to preserve `thisArg` when passing f to advice
		return advice.call(this, f.bind(this), slice(arguments));
	};
}
