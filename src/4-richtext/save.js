import { __ } from '@wordpress/i18n'
import { useBlockProps, RichText } from '@wordpress/block-editor'

export default function save( props ) {
	const blockProps = useBlockProps.save()

	return (
		<div { ...blockProps }>
			<RichText.Content
				tagName="p"
				className="content"
				value={ props.attributes.content }
			/>
		</div>
	)
}
