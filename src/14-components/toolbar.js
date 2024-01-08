import { __ } from '@wordpress/i18n'
import { BlockControls, AlignmentToolbar } from '@wordpress/block-editor'

export default function Toolbar( props ) {

	const { alignment, setAttributes } = props

	return (
		<BlockControls>
			<AlignmentToolbar
				value={ alignment }
				onChange={ alignment => setAttributes( { alignment: alignment } ) }
			/>
		</BlockControls>
	)
}
