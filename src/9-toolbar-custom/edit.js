import { __ } from '@wordpress/i18n'
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor'
import {
	Toolbar,
	ToolbarGroup,
	ToolbarButton,
	Tooltip
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

				<Toolbar label={ __( 'Styles', 'capitainewp-gut-bases' ) }>
					<ToolbarGroup>
						<Tooltip text={ __( 'Advice', 'capitainewp-gut-bases' )  }>
							<ToolbarButton
								icon="thumbs-up"
								className={ [
									'capitaine-toolbar-green',
									{ 'is-pressed': props.attributes.type == 'advice' },
								] }
								onClick={ () => props.setAttributes( { type: 'advice' } ) }
							/>
						</Tooltip>
						<Tooltip text={ __( 'Warning', 'capitainewp-gut-bases' )  }>
							<ToolbarButton
								icon="warning"
								className={ [
									'capitaine-toolbar-yellow',
									{ 'is-pressed': props.attributes.type == 'warning' },
								 ] }
								onClick={ () => props.setAttributes( { type: 'warning' } ) }
							/>
						</Tooltip>
						<Tooltip text={ __( 'Avoid', 'capitainewp-gut-bases' )  }>
							<ToolbarButton
								icon="dismiss"
								className={ [
									'capitaine-toolbar-red',
									{ 'is-pressed': props.attributes.type == 'avoid' },
								] }
								onClick={ () => props.setAttributes( { type: 'avoid' } ) }
							/>
						</Tooltip>
					</ToolbarGroup>
				</Toolbar>
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
