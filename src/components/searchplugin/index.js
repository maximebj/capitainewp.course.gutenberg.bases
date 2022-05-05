import { Fragment } from '@wordpress/element'
import { TextControl } from '@wordpress/components'
import { debounce } from 'throttle-debounce'
import { useState } from 'react'

import './style.scss'

export default function SearchPlugin( props ) {

	const { onChange } = props
	const [ results, setResults ] = useState( false );

  const onSearch = debounce( 300, search => {

    if( search.length < 3 ) { return }

		setResults( "Chargement…" )

		fetch( ajaxurl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: 'action=capitainewp_search_plugins&search=' + encodeURIComponent( search ),
      credentials: 'same-origin'
    } )
    .then( response => response.json() )
    .then( response => {
			if( response.data.plugins.length == 0 ) {
				setResults( 'Aucun résultat' )
      } else {
        setResults( response.data.plugins )
			}
    } )
		.catch( error => {
			console.log( error )
			setResults( '⚠️ Erreur : impossible de joindre wordpress.org' )
    } )
  } )

	return (
		<Fragment>

			<TextControl
				type="search"
				placeholder='Chercher une extension'
				onChange={ value => onSearch( value ) }
			/>

			<div className="capitainewp-results">
				{ results && Array.isArray(results) ?
					(
						<ul>
							{ results.map( plugin => {
								return (
									<li
										key={ plugin.slug }
										onClick={ () => onChange( plugin ) }
									>
										<img src={ plugin.icon } alt={ plugin.name } />
										<span>{ plugin.name }</span>
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
