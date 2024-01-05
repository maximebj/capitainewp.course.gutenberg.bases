import { __ } from '@wordpress/i18n'
import { useBlockProps } from '@wordpress/block-editor'

export default function save( props ) {
	const blockProps = useBlockProps.save()

	return (
		<div { ...blockProps }>
			<p className="content">{ props.attributes.content }</p>
		</div>
	)
}
