import { __ } from '@wordpress/i18n'
import { useBlockProps, RichText } from '@wordpress/block-editor'

export default function save( props ) {
	const blockProps = useBlockProps.save()

	// On ajoute notre classe personnalisée
	blockProps.className += ` is-${props.attributes.type}`

	return (
		<div { ...blockProps }>
			<RichText.Content
				tagName="div"
				className="content"
				value={ props.attributes.content }
				style={ { textAlign: props.attributes.alignment } }
			/>
		</div>
	)
}
