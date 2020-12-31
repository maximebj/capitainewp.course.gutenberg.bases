import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

import './style.scss'

import Edit from './edit'
import save from './save'

registerBlockType( 'capitainewp/first', {
	apiVersion: 2,
	title: __( '1. First Gutenberg block', 'capitainewp-gut-bases' ),
	description: __(
		'My first Gutenberg block.',
		'capitainewp-gut-bases'
	),
	category: 'common',
	icon: 'awards',
  keywords: [ __( 'first block', 'capitainewp-gut-bases' ) ],
	supports: {
		html: false,
	},
	edit: Edit,
	save,
} )
