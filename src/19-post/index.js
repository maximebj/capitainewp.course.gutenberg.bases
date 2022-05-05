import { registerBlockType } from '@wordpress/blocks'

import './style.scss'

import Edit from './edit'
import save from './save'

export default registerBlockType( 'capitainewp/post', {
	edit: Edit,
	save,
} )
