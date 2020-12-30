import { __ } from '@wordpress/i18n'
import { useBlockProps, RichText } from '@wordpress/block-editor'

import './editor.scss' // On importe la feuille de style pour l'éditeur

export default function Edit( props ) {
	const blockProps = useBlockProps()

	return (

		<div { ...blockProps }>
			<p className="first-line">
				<span>#</span>
				<RichText
					tagName="span"
					placeholder="1"
					value={ props.attributes.number }
					className="number"
					onChange={ number => props.setAttributes( { number } ) }
				/>
			</p>
			<RichText
				tagName="h2"
				placeholder={ __( 'Your title here', 'capitainewp-gut-bases' ) }
				value={ props.attributes.title }
				className="title"
				onChange={ title => props.setAttributes( { title } ) }
			/>
		</div>
	)
}
