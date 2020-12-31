import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

import './style.scss'

import Edit from './edit'
import save from './save'

registerBlockType( 'capitainewp/innerblocks', {
	apiVersion: 2,
	title: __( '16. Inner Blocks', 'capitainewp-gut-bases' ),
	description: __(
		'Blocks in the block!',
		'capitainewp-gut-bases'
	),
	category: 'text',
	icon: 'insert-before',
	edit: Edit,
	save,
} )
