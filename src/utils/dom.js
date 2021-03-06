// @flow

import { isSVGTag } from '../utils/is'

export {
	createElement,
	removeElement,
	addEvent,
	removeEvent,
}

// ----------------

const SVG_NAMESPACE: string = 'http://www.w3.org/2000/svg'

function createElement( tagName: string ) {
	if ( isSVGTag( tagName ) ) {
		return document.createElementNS( SVG_NAMESPACE, tagName )
	}

	return document.createElement( tagName )
}

function removeElement( element ): void {
	if ( element && element.parentNode ) {
		element.parentNode.removeChild( element )
	}
}

function addEvent( element, eventName: string, listener: Function ): void {
	if ( element.addEventListener ) {
		element.addEventListener( eventName, listener, false )
	} else {
		element.attachEvent( `on${ eventName }`, listener )
	}
}

function removeEvent( element, eventName: string, listener: Function ): void {
	if ( element.addEventListener ) {
		element.removeEventListener( eventName, listener, false )
	} else {
		element.detachEvent( `on${ eventName }`, listener )
	}
}
