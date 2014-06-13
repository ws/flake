var should = require('chai').should()

var flake = require('../lib/flake.js')

describe('flake', function(){

	describe('integer', function(){

		describe('should do things', function(){
			flake.integer(1).should.be.a('number')
			flake.integer(10).should.be.at.most(10)
		})

	})

})