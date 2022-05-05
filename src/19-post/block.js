import apiFetch from '@wordpress/api-fetch'
import { __ } from '@wordpress/i18n'
import { useBlockProps } from '@wordpress/block-editor'
import { useState, useEffect } from 'react'

import Message from '../components/message'

export default function Block( props ) {

	const { postID, showImage, showCategory, showAuthor  } = props

	// Définition des états
	const [ post, setPost ] = useState( false );
	const [ author, setAuthor ] = useState( false );
	const [ category, setCategory ] = useState( false );
	const [ featuredImage, setFeaturedImage ] = useState( false );

	// Hook React : lance la fonction getPost lorsque la valeur de postID change
	useEffect( () => getPost(), [ postID ] )
	useEffect( () => getAuthor(), [ post ] )
	useEffect( () => getCategory(), [ post ] )
	useEffect( () => getFeaturedImage(), [ post ] )

	// Fonction qui va chercher l'article à partir du Post ID fourni
	const getPost = () => {
		apiFetch( { path: `/wp/v2/posts/${postID}` } )
		.then( post => setPost( post ) )
	}

	// Et une fois qu'on a reçu le post, on va chercher des informations supplémentaires
	const getAuthor = () => {
		if( typeof post.author == "undefined" ) { return }
		apiFetch( { path: `/wp/v2/users/${post.author}` } )
		.then( author => setAuthor( author.name ) )
	}

	const getCategory = () => {
		if( typeof post.categories == "undefined" ) { return }
		apiFetch( { path: `/wp/v2/categories/${post.categories[0]}` } )
		.then( category => setCategory( category.name ) )
	}

	const getFeaturedImage = () => {
		if( typeof post.featured_media == "undefined" || post.featured_media == 0 ) { return }
		apiFetch( { path: `/wp/v2/media/${post.featured_media}` } )
		.then( featuredImage => {
			let size = featuredImage.media_details.sizes.hasOwnProperty( 'large' ) ? 'large' : 'full'
			let media = featuredImage.media_details.sizes[size].source_url
			setFeaturedImage( media )
		} )
	}


	// Get HTML Excerpt
	const getExcerpt = () => {
		return {__html: ( typeof post.excerpt != "undefined" ) ?  post.excerpt.rendered : '' }
	}

	const blockProps = useBlockProps()

  return (
		post ? (
			<div {...blockProps}>
				{ !! featuredImage && showImage && (
					<a
						href={ post.link }
						className="wp-block-capitainewp-post__image"
						style={ {
							backgroundImage: `url(${featuredImage})`
						} }
					/>
				) }
				<div className="wp-block-capitainewp-post__content">
					<p className="wp-block-capitainewp-post__title">
						<a href={ post.link }>{ post.title.rendered }</a>
					</p>
					<p className="wp-block-capitainewp-post__metas">
						<em>
							{ category && showCategory && (
							<span> { __( 'In', 'capitainewp-gut-bases' ) + ' ' + category } </span>
							) }
							{ author && showAuthor && (
							<span> { __( 'By', 'capitainewp-gut-bases' ) + ' ' + author } </span>
							) }
						</em>
					</p>
					<div
						className="wp-block-capitainewp-post__excerpt"
						dangerouslySetInnerHTML={ getExcerpt() }
					/>
					<p className="wp-block-capitainewp-post__actions">
						<a href={ post.link } className="wp-block-capitainewp-post__button">
							{ __( 'Read more', 'capitainewp-gut-bases' ) }
						</a>
					</p>
				</div>
			</div>
		) : (
			<Message
				label={ __( 'Loading post…', 'capitainewp-gut-bases' ) }
				withSpinner='true'
			/>
		)
	)
}
