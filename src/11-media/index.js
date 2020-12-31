import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

import './style.scss'

import Edit from './edit'
import save from './save'

registerBlockType( 'capitainewp/media', {
	apiVersion: 2,
	title: __( '11. Media import', 'capitainewp-gut-bases' ),
	description: __(
		'A block with a media import component.',
		'capitainewp-gut-bases'
	),
	category: 'text',
	icon: 'camera',

	attributes: {
		pictureID: { // L'identifiant de l'image
			type: 'number',
			default: null,
		},
		pictureURL: { // L'URL de l'image
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: 'img',
		},
		pictureAlt: { // Le texte alternatif de l'image
			type: 'string',
			source: 'attribute',
			attribute: 'alt',
			selector: 'img',
		},
	},
	edit: Edit,
	save,
} )
