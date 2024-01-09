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
	//register_block_type( __DIR__ . '/build/18-parameters' ); //still relevant ??? Nothing in the lessons on this one 

	// Ce bloc est également rendu en PHP pour le front
	register_block_type(
		__DIR__ . '/build/19-post',
		[ 'render_callback' => 'capitainewp_post_render' ]
	);

	// Ce bloc est également rendu en PHP pour le front
	register_block_type(
		__DIR__ . '/build/20-plugin',
		[ 'render_callback' => 'capitainewp_plugin_render' ]
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

/**
 * Rendu dynamique pour le bloc 20 : Plugin
 */
function capitainewp_plugin_render( $attributes ) {

	// Charger le fichier WordPress qui gère les extensions
	require_once( ABSPATH . 'wp-admin/includes/plugin-install.php' );

	// Si aucun slug n'est fourni, on n'affiche rien
	if( is_null( $attributes['slug'] ) ) {
		return '';
	}

	// On prépare la requête pour wp.org
	$request = [
		'slug' => $attributes['slug'],
		'fields' => [
			'title' => true,
			'short_description' => true,
			'active_installs' => true,
			'icons' => true,
			'sections' => false,
		]
	];

	// Envoi de la requête vers l'API wp.org
	$result = plugins_api( 'plugin_information', $request );

	// Préparation des données dont on aura besoin
	$plugin = capitainewp_prepare_plugins_data( $result );

	// Démarrage du cache d'affichage php
	ob_start();

	// inclusion du template
	include 'templates/plugin.php';

	// Récupération du HTML affiché via echo
	$markup = ob_get_contents();
	ob_end_clean();

	return $markup;
}

/**
 * Requête Ajax pour chercher un plugin sur wp.org
 */
function capitainewp_search_plugins() {

	// Charger le fichier WordPress qui gère les extensions
	require_once( ABSPATH . 'wp-admin/includes/plugin-install.php' );

	// Paramètres de la requête de recherche
	$request = [
		'per_page' => 20, // Nombre de résultats à afficher
		'search' => $_POST['search'], // La recherche saisie par l'utilisateur
		'fields' => [
			'title' => true,
			'short_description' => true,
			'active_installs' => true,
			'icons' => true,
			'sections' => false,
		]
	];

	// La fonction fournie par WordPress
	$results = plugins_api( 'query_plugins', $request );
	$plugins = [];

	// Je prépare les données en vue de leur affichage en JS
	foreach( $results->plugins as $plugin ) {
		$plugins[] = capitainewp_prepare_plugins_data( $plugin );
	}

	// Et je renvois à JS en JSON
	wp_send_json_success( $plugins );
}
add_action( 'wp_ajax_capitainewp_search_plugins', 'capitainewp_search_plugins' );

/**
 * Requête Ajax pour récupérer les informations d'un plugin sur wp.org
 */
function capitainewp_get_plugin() {
	require_once( ABSPATH . 'wp-admin/includes/plugin-install.php' );

	$request = [
		'slug' => $_POST['slug'], // On fournit cette fois le slug de l'extension
		'fields' => [
			'title' => true,
			'short_description' => true,
			'active_installs' => true,
			'icons' => true,
			'sections' => false,
		]
	];

	// On demande à l'API de wp.org de nous renvoyer les informations de l'extension
	$result = plugins_api( 'plugin_information', $request );

	// Et on trie les données pour JS
	$plugin = capitainewp_prepare_plugins_data( $result );

	// Enfin, on renvoie à JS en JSON
	wp_send_json_success( $plugin );
}
add_action( 'wp_ajax_capitainewp_get_plugin', 'capitainewp_get_plugin' );

/**
 * Préparer les données pour le plugin
 */
function capitainewp_prepare_plugins_data( $data ) {

	// On force l'obtention d'un objet (parfois on obtient un tableau)
	if( is_array( $data ) ) { $data = (object) $data; }

	// On prépare les données
	return [
		'slug' => $data->slug,
		'name' => html_entity_decode( $data->name ),
		'description' => html_entity_decode( $data->short_description ),
		'icon' => capitainewp_define_image( $data->icons ),
		'stars' => capitainewp_set_stars( $data->rating ),
		'activeInstalls' => capitainewp_format_installs( $data->active_installs ),
		'downloadLink' => "https://wordpress.org/plugins/" . $data->slug,
		'rating' => $data->rating,
		'numRatings' => $data->num_ratings,
		'author' => strip_tags( $data->author ),
		'homepage' => $data->homepage,
		'numRatings' => $data->num_ratings,
	];
}

/**
 * Récupérer l'image la plus appropriée en commençant par la version haute résolution si disponible
 */
function capitainewp_define_image( $icons ) {
	if ( array_key_exists( '2x', $icons ) ) {
		return $icons['2x'];
	} else if( array_key_exists( '1x', $icons ) ) {
		return $icons['1x'];
	} else {
		return $icons['default'];
	}
}

/**
 * Optimiser le libellé du nombre d'installations actives
 */
function capitainewp_format_installs( $installs ) {
	if ( $installs >= 1000000 ) {
		return '1+ Million';
	}
	else if( $installs < 10 ) {
		return 'Moins de 10';
	}

	return $installs . '+';
}


/**
 * Transformer la note sur 100 en étoiles
 */
function capitainewp_set_stars( $rating ) {
	$rating = intval( $rating ) / 20;
	$floor = floor( $rating );

	$max = 5;
	$last = 0;

	$stars = '';

	for( $i=0; $i < $floor; $i++ ) {
		$stars.= capitainewp_get_star_svg( 'filled' );
		$last++;
	}

	if( $floor != $rating ) {
		$stars.= capitainewp_get_star_svg( 'half' );
		$last++;
	}

	for ( $i = $last; $i < $max; $i++ ) {
		$stars.= capitainewp_get_star_svg( 'empty' );
	}

	return $stars;
}

/**
 * Étoiles SVG pleines, semi-pleines et vides
 */
function capitainewp_get_star_svg( $type ){
	if( $type == "filled" ) {
		return "
			<svg width='18px' height='18px'>
				<g fill='#F5BC41'>
					<polygon points='9 0 12 6 18 6.75 13.88 11.37 15 18 9 15 3 18 4.13 11.37 0 6.75 6 6'></polygon>
				</g>
			</svg>
		";

	} else if ( $type == "half" ) {
		return "
			<svg width='18px' height='18px'>
				<g fill='#F5BC41'>
					<path d='M9,0 L6,6 L0,6.75 L4.13,11.37 L3,18 L9,15 L15,18 L13.88,11.37 L18,6.75 L12,6 L9,0 Z M9,2.24 L11.34,6.93 L15.99,7.51 L12.81,11.07 L13.68,16.22 L9,13.88 L9,2.24 Z'></path>
				</g>
			</svg>
		";
	}

	return "
		<svg width='18px' height='18px'>
			<g fill='#F5BC41'>
				<path d='M9,0 L6,6 L0,6.75 L4.13,11.37 L3,18 L9,15 L15,18 L13.88,11.37 L18,6.75 L12,6 L9,0 Z M9,2.24 L11.34,6.93 L15.99,7.51 L12.81,11.07 L13.68,16.22 L9,13.88 L4.32,16.22 L5.19,11.07 L2.01,7.51 L6.66,6.93 L9,2.24 Z'></path>
			</g>
		</svg>
	";
}
