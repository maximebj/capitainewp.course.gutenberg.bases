import apiFetch from '@wordpress/api-fetch'
import { __ } from '@wordpress/i18n'
import { Fragment } from '@wordpress/element'
import { TextControl } from '@wordpress/components'
import { debounce } from 'throttle-debounce'
import { useState } from 'react'

import './style.scss'

export default function SearchPost( props ) {

	const { postType, placeholder, onChange } = props
	const [ results, setResults ] = useState( false );

  const onSearch = debounce( 300, search => {

    if( search.length < 3 ) { return }

		setResults( __( "Chargement…", 'capitainewp-gut-bases' ) )

		apiFetch( { path: `/wp/v2/${postType}/?search=${encodeURI( search )}&per_page=20` } )
		.then( ( posts ) => {
			if( posts.length == 0 ) {
        posts = __( "Aucun résultat", 'capitainewp-gut-bases' )
      }
      setResults( posts )
		} )
  } )

	return (
		<Fragment>

			<TextControl
				type="search"
				placeholder={ placeholder }
				onChange={ value => onSearch( value ) }
			/>

			<div className="capitainewp-results">
				{ results && Array.isArray(results) ?
					(
						<ul>
							{ results.map( result => {
								return (
									<li
										key={ result.id }
										onClick={ () => onChange( result.id ) }
									>
										{ result.title.rendered }
									</li>
								)
							} ) }
						</ul>
					) : (
						<p>{results}</p>
					)
				}
			</div>
		</Fragment>
	)
}
