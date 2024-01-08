import { useBlockProps } from '@wordpress/block-editor'
import { Spinner } from '@wordpress/components'
import './style.scss'

export default function Message( props ) {

	const { label, withSpinner } = props

	const blockProps = useBlockProps( {
		className: 'capitainewp-message',
	} )

	return (
		<p {...blockProps}>
			{ withSpinner && <Spinner /> }
			{ label }
		</p>
	)
}
