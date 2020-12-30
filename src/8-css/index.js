import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

import './style.scss' // On importe la feuille de style du bloc

import Edit from './edit'
import save from './save'

registerBlockType( 'capitainewp/css', {
	apiVersion: 2,
	title: __( '8. CSS', 'capitainewp-gut-bases' ),
	description: __(
		'A title block with some good looking CSS.',
		'capitainewp-gut-bases'
	),
	category: 'common',
	icon: 'admin-appearance',

	attributes: { // 2 attributs ici
		number: {
			type: 'string',
			source: 'html',
			selector: '.number',
		},
		title: {
			type: 'string',
			source: 'html',
			selector: '.title',
		},
	},

	edit: Edit,
	save,
} )
