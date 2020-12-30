import { __ } from '@wordpress/i18n'
import { useBlockProps, RichText } from '@wordpress/block-editor'

import './editor.scss'

export default function Edit( props ) {
	const blockProps = useBlockProps()

	// La fonction qui met à jour la valeur
	const onChangeContent = content => {
		props.setAttributes( { content: content } )
	}

	return (
		<div { ...blockProps }>
			<RichText
				tagName="p"
				placeholder={ __( 'Write your content here', 'capitainewp-gut-bases' ) }
				value={ props.attributes.content }
				className="content"
				onChange={ onChangeContent }
			/>
		</div>
	)
}
