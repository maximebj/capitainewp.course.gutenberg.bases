import { useBlockProps } from '@wordpress/block-editor'
import { useState, useEffect } from 'react'

import Message from '../components/message'

export default function Block( props ) {

	const { slug } = props.attributes

	// Définition d'un état : si plugin change, le composant est rendu à nouveau
	const [ plugin, setPlugin ] = useState( false );

	// Lorsque le slug change, on exécute getPlugin
	useEffect( () => getPlugin(), [ slug ] )

  const getPlugin = () => {

		fetch( ajaxurl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: 'action=capitainewp_get_plugin&slug=' + slug,
      credentials: 'same-origin'
    } )
    .then( response => response.json() )
    .then( response => setPlugin( response.data ) )
	}

	const blockProps = useBlockProps()

	return (
		plugin ? (
			<div {...blockProps}>

				<div className="wp-block-capitainewp-plugin__content">
					<a href={ plugin.downloadLink } className="wp-block-capitainewp-plugin__picture">
						<img src={ plugin.icon } alt={ plugin.name } />
					</a>

					<div className="wp-block-capitainewp-plugin__main">
						<p className="wp-block-capitainewp-plugin__title">
							<a href={ plugin.downloadLink }>{ plugin.name }</a>
						</p>
						<p className="wp-block-capitainewp-plugin__desc">{ plugin.description }</p>
						<p className="wp-block-capitainewp-plugin__author">
							par { ' ' }
							<a href={ plugin.homepage } target='_blank'>
								{ plugin.author }
							</a>
						</p>
					</div>
				</div>

				<footer className="wp-block-capitainewp-plugin__footer">
					<div className="wp-block-capitainewp-plugin__meta">
						<p className="wp-block-capitainewp-plugin__rating">
							<span
								className="wp-block-capitainewp-plugin__stars"
								dangerouslySetInnerHTML={ { __html: plugin.stars } }
							/>
							&nbsp;
							<span className="wp-block-capitainewp-plugin__num-rating">
								{ plugin.numRatings }
							</span>
						</p>
						<p className="wp-block-capitainewp-plugin__active">
							<span>{ plugin.activeInstalls }</span>
							{ ' ' }
							installations actives
						</p>
					</div>
					<div className="wp-block-capitainewp-plugin__download">
						<a
							href={ plugin.downloadLink }
							target="_blank"
							className="wp-block-capitainewp-plugin__button">
								Page officielle
							</a>
					</div>
				</footer>

			</div>
		) : (
			<Message
				withSpinner='true'
				label="Chargement de l'extension…"
			/>
		)
  )
}
