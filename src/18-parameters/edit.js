import { __ } from '@wordpress/i18n'
import { useBlockProps } from '@wordpress/block-editor'

import './editor.scss'

export default function Edit() {
	return (
		<p { ...useBlockProps() }>
			{__( 'Bloc 18 • voir index.js', 'capitainewp-gut-bases' )}
		</p>
	)
}
