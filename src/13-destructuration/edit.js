import { __ } from '@wordpress/i18n'
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor'
import {
	PanelBody,
	ButtonGroup,
	Button,
	ToggleControl,
	RangeControl,
} from '@wordpress/components'
import { Fragment } from '@wordpress/element'

import './editor.scss'

export default function Edit( props ) {
	const blockProps = useBlockProps()

	// Déstructuration des props
	const { attributes: { number, title, chapterSign, alignment, textColor, backgroundColor, withRadius, radius }, setAttributes, className, isSelected } = props

	return (
		<Fragment>

			<BlockControls>
				<AlignmentToolbar
					value={ alignment }
					onChange={ alignment => setAttributes( { alignment: alignment } ) }
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={ __( 'Chapter sign', 'capitainewp-gut-bases' ) }>
					<ButtonGroup>
						{ ['#', 'n°', '§'].map( (sign) => (
							<Button
								isLarge
								isPrimary={ chapterSign == sign }
								onClick={ () => setAttributes( { chapterSign: sign } ) }
							>
								{ sign }
							</Button>
						) ) }
					</ButtonGroup>
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Colors', 'capitainewp-gut-bases' ) }
					colorSettings={ [
						{
							value: textColor,
							onChange: textColor => setAttributes( { textColor } ),
							label: __( 'Title color', 'capitainewp-gut-bases' ),
						},
						{
							value: backgroundColor,
							onChange: backgroundColor => setAttributes( { backgroundColor } ),
							label: __( 'Background color', 'capitainewp-gut-bases' ),
						},
					] }
				/>

				<PanelBody title={ __( 'Border', 'capitainewp-gut-bases' ) }>
					<ToggleControl
						label={ __( 'Radius', 'capitainewp-gut-bases' ) }
						checked={ withRadius }
						onChange={ () => setAttributes( { withRadius: ! withRadius } ) }
					/>

					{ withRadius && (
						<RangeControl
							value={ radius }
							onChange={ radius  => setAttributes( { radius } ) }
							min={ 0 }
							max={ 30 }
							beforeIcon="arrow-down"
							afterIcon="arrow-up"
						/>
					)}
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }
				style={ {
					borderRadius: withRadius ? radius : null,
					backgroundColor: backgroundColor,
					textAlign: alignment,
				} }
			>
				<p
					className="first-line"
					style={ {
						color: textColor
					} }
				>
					<span>{ chapterSign }</span>
					<RichText
						tagName="span"
						placeholder="1"
						value={ number }
						className="number"
						onChange={ number => setAttributes( { number } ) }
					/>
				</p>
				<RichText
					tagName="h2"
					placeholder={ __( 'Your title here', 'capitainewp-gut-bases' ) }
					value={ title }
					className="title"
					onChange={ title => setAttributes( { title } ) }
				/>
			</div>

		</Fragment>
	)
}
