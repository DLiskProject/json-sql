'use strict';

var jsonSql = require('../lib');
var expect = require('expect.js');

describe('insert', function() {
	it('should throw error without `values`', function() {
		expect(function() {
			jsonSql.build({
				type: 'insert',
				table: 'users'
			});
		}).to.throwError(function(e) {
			expect(e).to.be.a(Error);
			expect(e.message).to.be('Values is empty in query properties.');
		});
	});

	it('should be ok with `values`', function() {
		var result = jsonSql.build({
			type: 'insert',
			table: 'users',
			values: {
				name: 'Max'
			}
		});

		expect(result.query).to.be('insert into users (name) values (p0);');
		expect(result.values).to.eql({p0: 'Max'});
	});

	it('should be ok with `with`', function() {
		var result = jsonSql.build({
			'with': [{
				name: 't_1',
				select: {
					table: 't_1'
				}
			}],
			type: 'insert',
			table: 'users',
			values: {
				name: 'Max'
			}
		});

		expect(result.query).to.be('with t_1 as (select * from t_1) insert into users (name) values ' +
			'(p0);');
		expect(result.values).to.eql({p0: 'Max'});
	});
});