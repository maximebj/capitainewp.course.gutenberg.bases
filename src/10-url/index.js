import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

import './style.scss'

import Edit from './edit'
import save from './save'

registerBlockType( 'capitainewp/url', {
	apiVersion: 2,
	title: __( '10. URL', 'capitainewp-gut-bases' ),
	description: __(
		'A block with an URL input component.',
		'capitainewp-gut-bases'
	),
	category: 'common',
	icon: 'admin-links',

	attributes: {
		text: {
			type: 'string',
			source: 'text',
			selector: 'a',
		},
		url: {
			type: 'string',
			source: 'attribute', // Cette fois on récupère un attribut
			selector: 'a', 			 // Dans une balise <a>
			attribute: 'href',   // Et c'est l'attribut href que l'on veut
		},
	},
	edit: Edit,
	save,
} )
