var path = require( 'path' );
var assert = require( 'assert' );
var utils = require( '..' );

describe( 'rollup-pluginutils', function () {
	describe( 'createFilter', function () {
		var createFilter = utils.createFilter;

		it( 'includes by default', function () {
			var filter = createFilter();
			assert.ok( filter( path.resolve( 'x' ) ) );
		});

		it( 'excludes IDs that are not included, if include.length > 0', function () {
			var filter = createFilter([ 'y' ]);
			assert.ok( !filter( path.resolve( 'x' ) ) );
			assert.ok( filter( path.resolve( 'y' ) ) );
		});

		it( 'excludes IDs explicitly', function () {
			var filter = createFilter( null, [ 'y' ]);
			assert.ok( filter( path.resolve( 'x' ) ) );
			assert.ok( !filter( path.resolve( 'y' ) ) );
		});

		it( 'handles non-array arguments', function () {
			var filter = createFilter( 'foo/*', 'foo/baz' );
			assert.ok( filter( path.resolve( 'foo/bar' ) ) );
			assert.ok( !filter( path.resolve( 'foo/baz' ) ) );
		});
	});

	describe( 'addExtension', function () {
		var addExtension = utils.addExtension;

		it( 'adds .js to an ID without an extension', function () {
			assert.equal( addExtension( 'foo' ), 'foo.js' );
		});

		it( 'ignores file with existing extension', function () {
			assert.equal( addExtension( 'foo.js' ), 'foo.js' );
			assert.equal( addExtension( 'foo.json' ), 'foo.json' );
		});

		it( 'ignores leading .', function () {
			assert.equal( addExtension( './foo' ), './foo.js' );
			assert.equal( addExtension( './foo.js' ), './foo.js' );
		});

		it( 'adds a custom extension', function () {
			assert.equal( addExtension( 'foo', '.wut' ), 'foo.wut' );
			assert.equal( addExtension( 'foo.lol', '.wut' ), 'foo.lol' );
		});
	});
});
