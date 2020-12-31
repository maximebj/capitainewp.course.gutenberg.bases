import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

import './style.scss'

import Edit from './edit'
import save from './save'

registerBlockType( 'capitainewp/richtext-toolbar', {
	apiVersion: 2,
	title: __( '6. RichText & Toolbar', 'capitainewp-gut-bases' ),
	description: __(
		'Editable block with RichText and a custom Toolbar.',
		'capitainewp-gut-bases'
	),
	category: 'text',
	icon: 'edit',

	// Alignement du bloc, et non pas du contenu
	supports: {
		align: true, // On permet de jouer avec l'alignement
		align: ['left', 'right', 'center'], // Ou on choisit les alignements autorisés
	},

	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: '.content'
		},
	},

	edit: Edit,
	save,
} )
