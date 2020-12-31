import { __ } from '@wordpress/i18n'
import { useBlockProps, RichText } from '@wordpress/block-editor'

export default function save( props ) {
	const blockProps = useBlockProps.save()

	return (
		<div { ...blockProps }
			style={ {
				borderRadius: props.attributes.withRadius && props.attributes.radius,
				backgroundColor: props.attributes.backgroundColor,
				textAlign: props.attributes.alignment,
			} }
		>
			<p
				className="first-line"
				style={ { color: props.attributes.textColor } }
			>
				<RichText.Content
					tagName="span"
					className="sign"
					value={ props.attributes.chapterSign }
				/>
				<RichText.Content
					tagName="span"
					className="number"
					value={ props.attributes.number }
				/>
			</p>
			<RichText.Content
				tagName="h2"
				className="title"
				value={ props.attributes.title }
			/>
		</div>
	)
}
