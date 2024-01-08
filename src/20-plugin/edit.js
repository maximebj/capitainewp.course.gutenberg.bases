import { Fragment } from '@wordpress/element'

import Inspector from './inspector'
import Block from './block'
import Message from '../components/message'

import './editor.scss'

export default function Edit( props ) {

	const { attributes, setAttributes } = props
	const { slug } = attributes

	return (
		<Fragment>
			<Inspector { ...{ setAttributes } } />

			{ slug ? (
				<Block { ...{ attributes } } />
			) : (
				<Message
					label="Recherchez une extension dans l'inspecteur →"
				/>
			) }
		</Fragment>
	)
}
