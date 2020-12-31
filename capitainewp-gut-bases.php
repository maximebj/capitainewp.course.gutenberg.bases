<?php
/**
 * Plugin Name:     Capitainewp Gut Bases
 * Description:     Exemples de la formation Gutenberg • Capitaine WP.
 * Version:         0.1.0
 * Author:          Maxime BJ
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     capitainewp-gut-bases
 *
 * @package         create-block
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function capitainewp_gut_bases_block_init() {
	$dir = __DIR__;

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "create-block/capitainewp-gut-bases" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'capitainewp-gut-bases-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'capitainewp-gut-bases-block-editor', 'capitainewp-gut-bases' );

	$editor_css = 'build/index.css';
	wp_register_style(
		'capitainewp-gut-bases-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'capitainewp-gut-bases-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'create-block/capitainewp-gut-bases', array(
		'editor_script' => 'capitainewp-gut-bases-block-editor',
		'editor_style'  => 'capitainewp-gut-bases-block-editor',
		'style'         => 'capitainewp-gut-bases-block',
	) );
}
add_action( 'init', 'capitainewp_gut_bases_block_init' );


// Pour l'exemple 15 : bloc Dynamique

// Fonction de génération du HTML dynamique
function capitainewp_dynamic_render( $attributes ) {

	$args = array(
		'posts_per_page' => 3,
	);

	$posts = get_posts( $args );

	if ( count( $posts ) == 0 ) {
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


// Déclarer les blocs qui ont un rendu côté PHP
function capitainewp_register_blocks() {

	// Pour l'exemple 15 : déclarer le bloc dynamique
  register_block_type( 'capitainewp/dynamic', array(
		'render_callback' => 'capitainewp_dynamic_render',
	) );

}
add_action( 'init', 'capitainewp_register_blocks' );
