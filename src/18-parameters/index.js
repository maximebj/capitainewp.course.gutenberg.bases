/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	// Dans index.js afin de rendre les chaines traduisibles
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
