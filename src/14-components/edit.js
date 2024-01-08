import { useBlockProps } from '@wordpress/block-editor'
import { Fragment } from '@wordpress/element'

import './editor.scss'

import Inspector from './inspector'
import Toolbar from './toolbar'
import Block from './block'

export default function Edit( props ) {
	const blockProps = useBlockProps()

	const { attributes, className, setAttributes} = props
	const { number, title, chapterSign, alignment, textColor, backgroundColor, withRadius, radius } = attributes

	return (
		<Fragment>
			<Toolbar { ...{ alignment, setAttributes} } />
			<Inspector { ...{ chapterSign, textColor, backgroundColor, withRadius, radius, setAttributes } } />
			<Block { ...{ blockProps, setAttributes, attributes } } />
		</Fragment>
	)
}
