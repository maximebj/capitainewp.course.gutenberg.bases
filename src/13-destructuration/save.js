import { __ } from '@wordpress/i18n'
import { useBlockProps, RichText } from '@wordpress/block-editor'

export default function save( props ) {
	const blockProps = useBlockProps.save()

	// Déstructuration des props
	const { number, title, chapterSign, alignment, textColor, backgroundColor, withRadius, radius } = props.attributes

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
				style={ { color: textColor } }
			>
				<RichText.Content
					tagName="span"
					className="sign"
					value={ chapterSign }
				/>
				<RichText.Content
					tagName="span"
					className="number"
					value={ number }
				/>
			</p>
			<RichText.Content
				tagName="h2"
				className="title"
				value={ title }
			/>
		</div>
	)
}
