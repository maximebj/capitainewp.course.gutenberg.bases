import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { withSelect } from '@wordpress/data' // Nous permettra de contacter l'API

import './style.scss'

import Edit from './edit'
import save from './save'

registerBlockType( 'capitainewp/dynamic', {
	apiVersion: 2,
	title: __( '15. Dynamic block', 'capitainewp-gut-bases' ),
	description: __(
		'This block gets the last 3 posts from the blog.',
		'capitainewp-gut-bases'
	),
	category: 'text',
	icon: 'wordpress-alt',
	edit: withSelect( select => { // On contacte l'API et on injecte les résultats dans Edit

		return {
			posts: select( 'core' ).getEntityRecords( 'postType', 'post', { per_page: 3 } )
		}

	} ) ( Edit ),
	save,
} )
