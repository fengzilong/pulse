import { isFunction, isSVGTag } from '../is'

test( 'isFunction', () => {
	function Foo() {}

	expect( isFunction( Foo ) ).toBe( true )
	expect( isFunction( {} ) ).toBe( false )
	expect( isFunction( '123' ) ).toBe( false )
	expect( isFunction( 123 ) ).toBe( false )
	expect( isFunction( null ) ).toBe( false )
	expect( isFunction( void 0 ) ).toBe( false )
} )

test( 'isSVGTag', () => {
	expect( isSVGTag( 'svg' ) ).toBe( true )
	expect( isSVGTag( 'img' ) ).toBe( false )
	expect( isSVGTag( 'div' ) ).toBe( false )
} )
