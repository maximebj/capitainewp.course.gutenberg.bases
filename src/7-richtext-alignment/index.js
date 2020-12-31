import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

import './style.scss'

import Edit from './edit'
import save from './save'

registerBlockType( 'capitainewp/richtext-alignment', {
	apiVersion: 2,
	title: __( '7. RichText & Alignment', 'capitainewp-gut-bases' ),
	description: __(
		'Editable block with RichText and Alignment options.',
		'capitainewp-gut-bases'
	),
	category: 'text',
	icon: 'edit',

	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: '.content'
		},
		alignment: {  // On ajoute un attribut alignment
			type: 'string', // Pas de sélecteur par contre
		},
	},

	edit: Edit,
	save,
} )
