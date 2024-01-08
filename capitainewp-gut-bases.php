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
}

add_action( 'init', 'capitainewp_gut_bases_block_init' );
