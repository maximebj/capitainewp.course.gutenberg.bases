import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

import './style.scss'

import Edit from './edit'
import save from './save'

registerBlockType( 'capitainewp/richtext', {
	apiVersion: 2,
	title: __( '4. Richtext', 'capitainewp-gut-bases' ),
	description: __(
		'Editable block with RichText component.',
		'capitainewp-gut-bases'
	),
	category: 'text',
	icon: 'edit',

	attributes: {
		content: {
			type: 'string',
			source: 'html', // On récupère du HTML et pas que du texte
			selector: '.content'
		},
	},

	edit: Edit,
	save,
} )
