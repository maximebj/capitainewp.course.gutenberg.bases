import { __ } from '@wordpress/i18n'
import { Component } from '@wordpress/element'
import {
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

export default class Settings extends Component {

	render() {

		const { chapterSign, textColor, backgroundColor, withRadius, radius, setAttributes } = this.props

		return (
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
					) }
				</PanelBody>
			</InspectorControls>
		)
	}
}
