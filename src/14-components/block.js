import { __ } from '@wordpress/i18n'
import { Component } from '@wordpress/element'
import { RichText } from '@wordpress/block-editor'

export default class Block extends Component {

	render() {
		const { attributes: { title, number, alignment, chapterSign, textColor, backgroundColor, withRadius, radius }, className, setAttributes, blockProps } = this.props

		return (
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
		)
	}
}
