import Watcher from '../Watcher'

test( 'should have $watch, $unwatch, $update', () => {
	const ob = new Watcher( {
		context: {},
		onUpdate() {}
	} )

	expect( ob.$watch ).toBeDefined()
	expect( ob.$unwatch ).toBeDefined()
	expect( ob.$update ).toBeDefined()
} )
