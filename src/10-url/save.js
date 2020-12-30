import { __ } from '@wordpress/i18n'
import { useBlockProps } from '@wordpress/block-editor'

export default function save( props ) {
	const blockProps = useBlockProps.save()

	return (
		<p { ...blockProps }>
			<a href={ props.attributes.url }>
				{ props.attributes.text }
			</a>
		</p>
	)
}
