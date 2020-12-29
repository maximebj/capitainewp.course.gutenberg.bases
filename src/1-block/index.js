import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import './style.scss';

import Edit from './edit';
import save from './save';

registerBlockType( 'create-block/capitainewp-gut-bases', {
	apiVersion: 2,
	title: __( 'First Gutenberg block', 'capitainewp-gut-bases' ),
	description: __(
		'My first Gutenberg block.',
		'capitainewp-gut-bases'
	),
	category: 'widgets',
	icon: 'awards',
  keywords: [ __( 'premier bloc', 'capitainewp-gut-bases' ) ],
	supports: {
		html: false,
	},
	edit: Edit,
	save,
} );
