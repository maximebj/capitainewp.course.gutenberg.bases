import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

import './style.scss'

import Edit from './edit'
import save from './save'

registerBlockType( 'capitainewp/destructuration', {
	apiVersion: 2,
	title: __( '13. Destructuration', 'capitainewp-gut-bases' ),
	description: __(
		'Props in the code are destructured for an easier reading.',
		'capitainewp-gut-bases'
	),
	category: 'text',
	icon: 'editor-expand',

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
