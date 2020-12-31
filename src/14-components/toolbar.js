import { __ } from '@wordpress/i18n'
import { Component } from '@wordpress/element'
import { BlockControls, AlignmentToolbar } from '@wordpress/block-editor'

export default class Toolbar extends Component {

	render() {

		const { alignment, setAttributes } = this.props

		return (
			<BlockControls>
				<AlignmentToolbar
					value={ alignment }
					onChange={ alignment => setAttributes( { alignment: alignment } ) }
				/>
			</BlockControls>
		)
	}
}
