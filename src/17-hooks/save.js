import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<p {...useBlockProps.save()}>
			{__( 'Bloc 17 • Hooks • Regardez l’inspecteur', 'capitainewp-gut-bases' )}
		</p>
	);
}
