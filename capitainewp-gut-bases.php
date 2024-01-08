<?php
/**
 * Plugin Name:       Capitaine WP • Formation Gutenberg
 * Description:       Les blocs de la formation Gutenberg 2024 de Capitaine WP
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           3.1
 * Author:            Maxime BJ • Capitaine WP - François de Cambourg • FinePress
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       capitainewp-gut-bases
 *
 * @package           create-block
 * @package           @wordpress/scripts
 * 
 */


if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function capitainewp_gut_bases_block_init() {
	register_block_type( __DIR__ . '/build/1-block' );
	register_block_type( __DIR__ . '/build/2-icon' );
	register_block_type( __DIR__ . '/build/3-edit' );
	register_block_type( __DIR__ . '/build/4-richtext' );
	register_block_type( __DIR__ . '/build/5-richtext-multiline' );
	register_block_type( __DIR__ . '/build/6-richtext-toolbar' );
	register_block_type( __DIR__ . '/build/7-richtext-alignment' );
	register_block_type( __DIR__ . '/build/8-css' );
	register_block_type( __DIR__ . '/build/9-alert' );
	register_block_type( __DIR__ . '/build/10-url' );
	register_block_type( __DIR__ . '/build/11-media' );
	register_block_type( __DIR__ . '/build/12-inspector' );
	register_block_type( __DIR__ . '/build/13-destructuration' );
	register_block_type( __DIR__ . '/build/14-components' );

	// 2è argument : callback pour le rendu PHP
	register_block_type(
		__DIR__ . '/build/15-dynamic',
		[ 'render_callback' => 'capitainewp_dynamic_render' ]
	);

	register_block_type( __DIR__ . '/build/16-innerblocks' );
	register_block_type( __DIR__ . '/build/17-hooks' );
	register_block_type( __DIR__ . '/build/18-parameters' ); //still relevant ??? Nothing in the lessons on this one 

	// Ce bloc est également rendu en PHP pour le front
	register_block_type(
		__DIR__ . '/build/19-post',
		[ 'render_callback' => 'capitainewp_post_render' ]
	);


}

add_action( 'init', 'capitainewp_gut_bases_block_init' );


/**
 * Rendu dynamique pour le bloc 15
 */
function capitainewp_dynamic_render( $attributes )
{
	$args = [
		'posts_per_page' => 3,
	];

	$posts = get_posts( $args );

	if( count( $posts ) == 0 ) {
		return '<p>Pas d’article</p>';
	}

	$markup = '<ul class="wp-block-capitainewp-dynamic">';

	foreach( $posts as $post ) {

		$markup .= sprintf(
			'<li><a href="%1$s">%2$s</a></li>',
			esc_url( get_permalink( $post->ID ) ),
			esc_html( get_the_title( $post->ID ) )
		);
	}
	$markup .= '</ul>';

	return $markup;
}


/**
 * Rendu dynamique pour le bloc 19 : Post
 */
function capitainewp_post_render( $attributes )
{
	// Récupération de l'ID de l'article dans le commentaire HTML
	$id = $attributes['postID'];

	// Requête pour récupérer l'article et préparer les données
	$query = new WP_Query( [ 'p' => $id ] );
	if( $query->have_posts() ): while( $query->have_posts() ): $query->the_post();

	// Récupération de l'image, l'auteur et la catégorie (s'ils sont définis)
	$image = false;
	$author = false;
	$category = false;

	if( $attributes['showImage'] !== false ) {
		$image = wp_get_attachment_image_src( get_post_thumbnail_id(), 'medium' );
		$image = $image[0];
	}

	if( $attributes['showAuthor'] !== false ) {
		$author = get_the_author_meta( 'display_name' );
	}

	if ( $attributes['showCategory'] !== false ) {
		$categories = get_the_category();

		if ( !empty( $categories ) ) {
			$category = $categories[0]->name;
		}
  }

	// Démarrage du cache d'affichage php
	ob_start();

	// inclusion du template
	include 'templates/post.php';

	// Récupération du HTML affiché via echo
	$markup = ob_get_contents();
	ob_end_clean();

	// Fin de la requête
	endwhile;
	wp_reset_postdata();
	endif;

	return $markup;
}
