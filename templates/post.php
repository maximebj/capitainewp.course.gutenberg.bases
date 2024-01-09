<div class="wp-block-capitainewp-post">
	<?php if( $image ): ?>
		<a href="<?php the_permalink(); ?>" class="wp-block-capitainewp-post__image" style="background-image: url('<?php echo $image; ?>')">
		</a>
	<?php endif; ?>
	<div class="wp-block-capitainewp-post__content">
		<p class="wp-block-capitainewp-post__title">
			<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
		</p>
		<p class="wp-block-capitainewp-post__metas">
			<em>
				<?php if( $category ): ?>
					<span> <?php _e( 'In', 'capitainewp' ); ?> <?php echo $category; ?> </span>
				<?php endif; ?>
				<?php if( $author ): ?>
					<span> <?php _e( 'By', 'capitainewp' ); ?> <?php echo $author; ?> </span>
				<?php endif; ?>
			</em>
		</p>
		<div class="wp-block-capitainewp-post__excerpt">
			<p>
				<?php the_excerpt(); ?>
			</p>
		</div>
		<p class="wp-block-capitainewp-post__actions">
			<a href="<?php the_permalink(); ?>" class="wp-block-capitainewp-post__button">
				<?php _e( 'Read more', 'capitainewp' ); ?>
			</a>
		</p>
	</div>
</div>
