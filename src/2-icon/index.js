import { registerBlockType } from '@wordpress/blocks'

import './style.scss'

import Edit from './edit'
import save from './save'
import myIcon from './custom-icon' // On stocke l'icône dans un fichier à part

registerBlockType( 'capitainewp/icon', {
	icon: myIcon,
	edit: Edit,
	save,
} )
