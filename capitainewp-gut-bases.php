<?php
/**
 * Plugin Name:       Capitaine WP • Formation Gutenberg
 * Description:       Les blocs de la formation Gutenberg 2022 de Capitaine WP
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           3.0
 * Author:            Maxime BJ • Capitaine WP
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       capitainewp-gut-bases
 *
 * @package           create-block
 */


/**
 * Déclaration de nos blocs
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function capitainewp_gut_bases_block_init()
{
	register_block_type( __DIR__ . '/build/1-block' );
	register_block_type( __DIR__ . '/build/2-icon' );
	register_block_type( __DIR__ . '/build/3-edit' );
	register_block_type( __DIR__ . '/build/4-richtext' );
	register_block_type( __DIR__ . '/build/5-richtext-multiline' );
	register_block_type( __DIR__ . '/build/6-richtext-toolbar' );
	register_block_type( __DIR__ . '/build/7-richtext-alignment' );
	register_block_type( __DIR__ . '/build/8-css' );
	register_block_type( __DIR__ . '/build/9-toolbar-custom' );
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
	register_block_type( __DIR__ . '/build/18-parameters' );
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
