import { __ } from '@wordpress/i18n'
import {
	useBlockProps,
	RichText,
	AlignmentToolbar, // On charge la Toolbar
	BlockControls, // Et les options d'alignement supplémentaires
} from '@wordpress/block-editor'
import { Fragment } from '@wordpress/element'

import './editor.scss'

export default function Edit( props ) {
	const blockProps = useBlockProps()

	return (
		<Fragment>

			<BlockControls>
				<AlignmentToolbar
					value={ props.attributes.alignment }
					onChange={ alignment => props.setAttributes( { alignment } ) }
				/>
			</BlockControls>

			<div { ...blockProps }>
				<RichText
					tagName="div"
					multiline="p"
					placeholder={ __( 'Write your content here', 'capitainewp-gut-bases' ) }
					value={ props.attributes.content }
					className="content"
					onChange={ content => props.setAttributes( { content } ) }
					style={ { textAlign: props.attributes.alignment } }
				/>
			</div>

		</Fragment>
	)
}
