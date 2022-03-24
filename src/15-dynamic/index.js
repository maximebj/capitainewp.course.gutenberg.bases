import { registerBlockType } from '@wordpress/blocks'
import { withSelect } from '@wordpress/data' // Nous permettra de contacter l'API

import './style.scss'

import Edit from './edit'
import save from './save'

registerBlockType( 'capitainewp/dynamic', {
	// On contacte l'API et on injecte les résultats dans Edit
	edit: withSelect( select => {
		return {
			posts: select( 'core' ).getEntityRecords( 'postType', 'post', { per_page: 3 } )
		}
	} ) ( Edit ),
	save,
} )
