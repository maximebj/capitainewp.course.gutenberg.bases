import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

import './style.scss'

import Edit from './edit'
import save from './save'

registerBlockType( 'capitainewp/alert', {
	apiVersion: 2,
	title: __( '9. Alert', 'capitainewp-gut-bases' ),
	description: __(
		'An alert block with different styles.',
		'capitainewp-gut-bases'
	),
	category: 'text',
	icon: 'yes-alt',

	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: '.content'
		},
		alignment: {
			type: 'string',
		},
		type: {
			type: 'string',
			default: 'advice', // Valeur par défaut
		}
	},

	edit: Edit,
	save,
} )
