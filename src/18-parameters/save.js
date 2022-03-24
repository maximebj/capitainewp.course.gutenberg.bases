import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<p {...useBlockProps.save()}>
			{__( 'Bloc 18 • voir index.js', 'capitainewp-gut-bases' )}
		</p>
	)
}
