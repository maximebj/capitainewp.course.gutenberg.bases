import { __ } from '@wordpress/i18n'
import { useBlockProps } from '@wordpress/block-editor'

import './editor.scss'

export default function Edit() {
	return (
		<p { ...useBlockProps() }>
			{ __(
				'Capitainewp Gut Bases – hello from the editor!',
				'capitainewp-gut-bases'
			) }
		</p>
	);
}
