import { __ } from '@wordpress/i18n'
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor'
import {
	ToolbarGroup,
	ToolbarButton
} from '@wordpress/components'
import { Fragment } from '@wordpress/element'

import './editor.scss'

export default function Edit( props ) {
	const blockProps = useBlockProps()

	// On ajoute notre classe personnalisée
	blockProps.className += ` is-${props.attributes.type}`

	return (
		<Fragment>
			<BlockControls>
				<AlignmentToolbar
					value={ props.attributes.alignment }
					onChange={ alignment => props.setAttributes( { alignment } ) }
				/>

				<ToolbarGroup>
					<ToolbarButton
						icon="thumbs-up"
						label={ __( 'Advice', 'capitainewp-gut-bases' )  }
						className='capitaine-toolbar-green'
						onClick={ () => props.setAttributes( { type: 'advice' } ) }
						isPressed={ props.attributes.type == 'advice' }
					/>

					<ToolbarButton
						icon="warning"
						label={ __( 'Warning', 'capitainewp-gut-bases' )  }
						className='capitaine-toolbar-yellow'
						onClick={ () => props.setAttributes( { type: 'warning' } ) }
						isPressed={ props.attributes.type == 'warning' }
					/>

					<ToolbarButton
						icon="dismiss"
						label={ __( 'Avoid', 'capitainewp-gut-bases' )  }
						className='capitaine-toolbar-red'
						onClick={ () => props.setAttributes( { type: 'avoid' } ) }
						isPressed={ props.attributes.type == 'avoid' }
					/>
				</ToolbarGroup>
			</BlockControls>

			<div { ...blockProps }>
				<RichText
					tagName="div"
					multiline="p"
					placeholder={ __('Write a text!', 'capitainewp-gut-bases' ) }
					value={ props.attributes.content }
					className="content"
					onChange={ content => props.setAttributes( { content } ) }
					style={ { textAlign: props.attributes.alignment } }
				/>
			</div>
		</Fragment>
	)
}
