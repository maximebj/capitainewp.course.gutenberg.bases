import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

import './style.scss'

import Edit from './edit'
import save from './save'

registerBlockType( 'capitainewp/edit', {
	apiVersion: 2,
	title: __( 'Editable block', 'capitainewp-gut-bases' ),
	description: __(
		'My first Gutenberg block.',
		'capitainewp-gut-bases'
	),
	category: 'common',
	icon: 'edit',

	// C'est ici que l'on défini les champs dynamiques
	attributes: {
		content: {
			type: 'string',
			source: 'text',
			selector: '.content'
		},
	},

	edit: Edit,
	save,
} )
