import { __ } from '@wordpress/i18n'
import { useBlockProps } from '@wordpress/block-editor'
import { Spinner } from '@wordpress/components'

import './editor.scss'

export default function Edit( props ) {
	const blockProps = useBlockProps()
	const { posts } = props // Posts est la valeur récupérée par withSelect

	console.log( posts )

	// L'API n'a pas encore répondu
	if ( ! posts ) {
		return (
			<div { ...blockProps }>
				<p className="capitaine-placeholder">
					<Spinner />
					{ __( 'Fetching posts', 'capitainewp-gut-bases' ) }
				</p>
			</div>
		)
	}

	// L'API a répondu mais aucun article ne correspond aux critères
	if ( posts.length === 0 ) {
		return (
			<div { ...blockProps }>
				<p className="capitaine-placeholder">
					{ __( 'No post found', 'capitainewp-gut-bases' ) }
				</p>
			</div>
		)
	}

	// L'API a répondu avec des résultats à afficher
	return (
		<ul { ...blockProps }>
			{ posts.map( post => {
				return (
					<li>
						<a href={ post.link }>
							{ post.title.rendered }
						</a>
					</li>
					)
			} ) }
		</ul>
	)
}
