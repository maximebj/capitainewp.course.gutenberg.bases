import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<p {...useBlockProps.save()}>
			{__( 'Premier bloc • Contenu sauvegardé en base', 'capitainewp-gut-bases' )}
		</p>
	);
}
