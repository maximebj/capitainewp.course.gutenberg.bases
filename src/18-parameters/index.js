import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

import './style.scss'

import Edit from './edit'
import save from './save'

registerBlockType( 'capitainewp/parameters', {
	apiVersion: 2,
	title: __( '18. Block settings', 'capitainewp-gut-bases' ),
	description: __(
		'Some other interesting settings for your blocks.',
		'capitainewp-gut-bases'
	),
	category: 'text',
	icon: 'list-view',
  keywords: [
		__( 'first keyword',  'capitainewp-gut-bases' ),
		__( 'second keyword', 'capitainewp-gut-bases' ),
		__( 'third keyword',  'capitainewp-gut-bases' )
	],
	supports : {
		multiple: false, // Ne peut-être utilisé qu'une seule fois
		anchor: true, // Permet de définir un ID sur le bloc afin de créer une ancre
		customClassName: false, // Retire le champ de classe personnalisée
		className: false, // Désactive le nom de classe du bloc (.wp-block-capitainewp-monbloc)
		html: false, // Empêche l'utilisateur d'éditer directement le HTML
		align: true, // Méthode plus rapide pour ajouter l'alignement
		reusable: false, // Empecher de convertir ce bloc en bloc réutilisable
	},
	edit: Edit,
	save,
	transforms: { // Permet de transformer un paragraphe en ce bloc
		from: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( { content } ) => {
					return createBlock( 'capitainewp/parameters', {
						content,
					} )
				},
			},
		]
	},
} )
