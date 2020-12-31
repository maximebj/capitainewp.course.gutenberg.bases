import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

import './style.scss'

import Edit from './edit'
import save from './save'

registerBlockType( 'capitainewp/inspector', {
	apiVersion: 2,
	title: __( '12. Inspector', 'capitainewp-gut-bases' ),
	description: __(
		'A title block with some settings in the Inspector.',
		'capitainewp-gut-bases'
	),
	category: 'common',
	icon: 'admin-settings',

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
