import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

import './style.scss'

import Edit from './edit'
import save from './save'

registerBlockType( 'capitainewp/richtext-multiline', {
	apiVersion: 2,
	title: __( '5. RichText & Multiline', 'capitainewp-gut-bases' ),
	description: __(
		'Editable block with RichText and Multiline support.',
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
