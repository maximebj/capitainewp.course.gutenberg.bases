import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

import './style.scss'

import Edit from './edit'
import save from './save'

registerBlockType( 'capitainewp/components', {
	apiVersion: 2,
	title: __( '14. Components', 'capitainewp-gut-bases' ),
	description: __(
		'Separate components for a lighter code.',
		'capitainewp-gut-bases'
	),
	category: 'common',
	icon: 'screenoptions',

	attributes: {
		number: {
			type: "string",
			source: "html",
			selector: ".number"
		},
		title: {
			type: "string",
			source: "html",
			selector: ".title"
		},
		chapterSign: {
			type: 'string',
			source: 'text',
			selector: '.sign',
			default: '#',
		},
		alignment: {
			type: 'string',
		},
		textColor: {
			type: 'string',
		},
		backgroundColor: {
			type: 'string',
		},
		withRadius: {
			type: 'boolean',
			default: false,
		},
		radius: {
			type: 'integer',
			default: 8,
		},
	},

	edit: Edit,
	save,
} )
