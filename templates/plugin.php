<div class="wp-block-capitainewp-plugin">
	<div class="wp-block-capitainewp-plugin__content">
		<a href="<?php echo $plugin->downloadLink ?>" class="wp-block-capitainewp-plugin__picture">
			<img src="<?php echo $plugin->icon ?>" alt="<?php echo $plugin->name ?>" />
		</a>

		<div class="wp-block-capitainewp-plugin__main">
			<p class="wp-block-capitainewp-plugin__title">
				<a href="<?php echo $plugin->downloadLink ?>"><?php echo $plugin->name ?></a>
			</p>
			<p class="wp-block-capitainewp-plugin__desc"><?php echo $plugin->description ?></p>
			<p class="wp-block-capitainewp-plugin__author">
				Par
				<a href="<?php echo $plugin->homepage ?>" target='_blank'>
					<?php echo $plugin->author ?>
				</a>
			</p>
		</div>
	</div>

	<footer class="wp-block-capitainewp-plugin__footer">
		<div class="wp-block-capitainewp-plugin__meta">
			<p class="wp-block-capitainewp-plugin__rating">
				<span class="wp-block-capitainewp-plugin__stars">
					<?php echo $plugin->stars ?>
				</span>
				<span class="wp-block-capitainewp-plugin__num-rating"><?php echo $plugin->numRatings ?></span>
			</p>
			<p class="wp-block-capitainewp-plugin__active">
				<span><?php echo $plugin->activeInstalls ?></span>
				installations actives
			</p>
		</div>
		<div class="wp-block-capitainewp-plugin__download">
			<a
				href="<?php echo $plugin->downloadLink ?>"
				target="_blank"
				class="wp-block-capitainewp-plugin__button">
					Page officielle
				</a>
		</div>
	</footer>
</div>
