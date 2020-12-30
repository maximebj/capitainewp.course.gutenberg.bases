import { __ } from '@wordpress/i18n'
import { useBlockProps, RichText } from '@wordpress/block-editor'

import './editor.scss'

export default function Edit( props ) {
	const blockProps = useBlockProps()

	return (
		<div { ...blockProps }>
			<RichText
				tagName="div"
				multiline="p"
				placeholder={ __( 'Write your content here', 'capitainewp-gut-bases' ) }
				value={ props.attributes.content }
				className="content"
				onChange={ content => props.setAttributes( { content } ) }
				allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
			/>
		</div>
	)
}
