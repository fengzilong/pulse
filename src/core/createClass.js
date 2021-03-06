// @flow
export default createClass

// ----------------------

function createClass(
	protoProps = {},
	staticProps = {},
	target = () => {}
) {
	Object.assign( target, staticProps )
	Object.assign( target.prototype, protoProps )
	target.extend = createExtend( staticProps )
	target.implement = createImplement( target.prototype )
	target.proto = pro.bind( target )

	return target
}

const suprRE = /xyz/.test( function () { 'xyz' } ) ? /\bsupr\b/ : /.*/
const hasOwn = Object.prototype.hasOwnProperty

function createExtend( staticProps: Object ): Function {
	return function extend( definition = {} ) {
		const parent = this
		const parentProto = this.prototype

		const Child: any = function () {
			parent.apply( this, arguments )
		}
		Child.prototype = Object.create( parentProto )
		// fix prototype constructor
		Child.prototype.constructor = Child

		// add extend and implement
		Child.extend = extend
		Child.implement = createImplement( parentProto )
		Child.proto = pro.bind( Child )

		// inherits static methods
		Object.assign( Child, staticProps )
		// merge to prototype
		Child.implement( definition )
		// chain parent
		Child.parent = parent
		// make definition available
		Child.definition = definition

		return Child
	}
}

function createImplement( parentProto ): Function {
	return function implement( definition ) {
		const proto = this.prototype
		// assign and supr
		for ( const key in definition ) {
			if ( hasOwn.call( definition, key ) ) {
				// function and contains supr invoke
				let value = definition[ key ]
				const parentProtoValue = parentProto[ key ]
				if (
					typeof value === 'function' &&
					typeof parentProtoValue === 'function' &&
					suprRE.test( value )
				) {
					value = wrapSupr( value, parentProtoValue )
				}

				proto[ key ] = value
			}
		}
		return this
	}
}

function pro( property ) {
	return walk( this, property )
}

function walk( Ctor = {}, property = '' ) {
	const value = ( Ctor.prototype && Ctor.prototype[ property ] ) || {}
	if ( Ctor.parent ) {
		return {
			...walk( Ctor.parent, property ),
			...value
		}
	} else {
		return value
	}
}

function wrapSupr( fn: Function, parentFn: Function ): Function {
	return function () {
		// save
		const previous = this.supr
		this.supr = parentFn
		const rst = fn.apply( this, arguments )
		// recover
		this.supr = previous
		return rst
	}
}
