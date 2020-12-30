import { __ } from '@wordpress/i18n'
import { useBlockProps } from '@wordpress/block-editor'

export default function save( props ) {
	const blockProps = useBlockProps.save()

	return (
		props.attributes.pictureID && (
			<p { ...blockProps }>
				<img src={ props.attributes.pictureURL } alt={ props.attributes.pictureAlt } />
			</p>
		)
	)
}
