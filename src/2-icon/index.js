import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

import './style.scss'

import Edit from './edit'
import save from './save'
import myIcon from './custom-icon.js' // On stocke l'icône dans un fichier à part

registerBlockType( 'capitainewp/icon', {
	apiVersion: 2,
	title: __( '2. Block with custom icon', 'capitainewp-gut-bases' ),
	description: __(
		'A block with a custom SVG icon',
		'capitainewp-gut-bases'
	),
	category: 'text',
	icon: myIcon,
	edit: Edit,
	save,
} )
