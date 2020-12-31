import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

import './style.scss'

import Edit from './edit'
import save from './save'

registerBlockType( 'capitainewp/edit', {
	apiVersion: 2,
	title: __( '3. Editable block', 'capitainewp-gut-bases' ),
	description: __(
		'Editable block.',
		'capitainewp-gut-bases'
	),
	category: 'text',
	icon: 'edit',

	// C'est ici que l'on défini les champs dynamiques
	attributes: {
		content: {
			type: 'string',
			source: 'text',
			selector: '.content'
		},
	},

	edit: Edit,
	save,
} )
