import { __ } from '@wordpress/i18n'
import { Fragment } from '@wordpress/element'

import Block from './block'
import Inspector from './inspector'
import Message from '../components/message'

import './editor.scss'

export default function Edit( props ) {
	const { attributes, setAttributes } = props
  	const { postID } = attributes

	return (
		<Fragment>

			<Inspector { ...{ attributes, setAttributes } } />

			{ postID ? (
				<Block { ...attributes } />
			) : (
				<Message
					label={ __( 'Search for a post in the inspector →', 'capitainewp-gut-bases' ) }
				/>
			) }

		</Fragment>
	)
}
