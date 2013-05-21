var buster, assert, refute, aop, sentinel, other;

aop = require('../src/aop-simple');

buster = require('buster');
assert = buster.assert;
refute = buster.refute;

sentinel = {};
other = {};

buster.testCase('aop-simple', {
	'before': {
		'should call advice once, before target, with same args': function() {
			var target, advice, advised, result;

			target = this.stub().returns(sentinel);
			advice = this.spy();

			advised = aop.before(target, advice);
			result = advised(sentinel);

			assert.callOrder(advice, target);
			assert.calledOnce(target);
			assert.calledOnce(advice);

			assert.same(result, sentinel);

			assert.same(target.getCall(0).args[0], advice.getCall(0).args[0]);
			assert.equals(target.getCall(0).args.length, advice.getCall(0).args.length);
		}
	},

	'afterReturning': {
		'should call advice once, after target returns, with return value': function() {
			var target, advice, advised, result;

			target = this.stub().returns(sentinel);
			advice = this.stub().returns(sentinel);

			advised = aop.afterReturning(target, advice);
			result = advised(123);

			assert.callOrder(target, advice);
			assert.calledOnceWith(target, 123);
			assert.calledOnce(advice);

			assert.same(result, sentinel);

			assert.same(advice.getCall(0).args[0], sentinel);
		},

		'should not call advice if target throws': function() {
			var target, advice, advised;

			target = this.stub().throws(sentinel);
			advice = this.spy();

			advised = aop.afterReturning(target, advice);

			assert.exception(function() {
				try {
					advised(123);
				} catch(e) {
					assert.same(e, sentinel);
					throw e;
				}
			});

			assert.calledOnceWith(target, 123);
			refute.called(advice);
		}
	},

	'afterThrowing': {
		'should call advice once, after target throws, with thrown exception': function() {
			var target, advice, advised;

			target = this.stub().throws(other);
			advice = this.stub().returns(sentinel);

			advised = aop.afterThrowing(target, advice);

			result = advised(123);

			assert.callOrder(target, advice);
			assert.calledOnceWith(target, 123);
			assert.calledOnce(advice);

			assert.same(result, sentinel);

			assert.same(advice.getCall(0).args[0], other);
		},

		'should not call advice if target returns': function() {
			var target, advice, advised, result;

			target = this.stub().returns(sentinel);
			advice = this.stub().returns(other);

			advised = aop.afterThrowing(target, advice);

			result = advised(123);

			assert.calledOnceWith(target, 123);
			refute.called(advice);

			assert.same(result, sentinel);
		}
	},

	'around': {
		'should call advice once, with target and original args': function() {
			var target, advice, advised, result;

			target = this.stub().returns(sentinel);
			advice = this.spy(function(f, args) {
				assert.same(args[0], other);
				assert.equals(args.length, 1);
				return f.apply(this, args);
			});

			advised = aop.around(target, advice);

			result = advised(other);

			assert.callOrder(advice, target);
			assert.calledOnce(advice);
			assert.calledOnce(target);

			assert.same(result, sentinel);
		},

		'should be allowed to change target return value': function() {
			var target, advice, advised, result;

			target = this.stub().returns(other);
			advice = this.spy(function(f, args) {
				f.apply(this, args);
				return sentinel;
			});

			advised = aop.around(target, advice);

			result = advised(other);

			assert.same(result, sentinel);
		},

		'should be allowed to change target arguments': function() {
			var target, advice, advised;

			target = this.spy();
			advice = this.spy(function(f, args) {
				f.call(this, sentinel);
			});

			advised = aop.around(target, advice);

			advised(other);

			assert.same(target.getCall(0).args[0], sentinel);
		},

		'should be allowed to transform failure into success': function() {
			var target, advice, advised, result;

			target = this.stub().throws(other);
			advice = this.spy(function(f, args) {
				try {
					f.apply(this, args);
				} catch(e) {}

				return sentinel;
			});

			advised = aop.around(target, advice);

			result = advised(other);

			assert.same(result, sentinel);
		},

		'should be allowed to transform success into failure': function() {
			var target, advice, advised, result;

			target = this.stub().returns(other);
			advice = this.spy(function(f, args) {
				f.apply(this, args);
				throw sentinel;
			});

			advised = aop.around(target, advice);

			assert.exception(function() {
				try {
					advised(other);
				} catch(e) {
					assert.same(e, sentinel);
					throw e;
				}
			});
		}

	}

});
