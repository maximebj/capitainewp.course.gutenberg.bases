import { __ } from '@wordpress/i18n'
import { InspectorControls } from '@wordpress/blockEditor'
import { PanelBody, ToggleControl } from '@wordpress/components'

import SearchPost from '../components/searchpost'

export default function Inspector( props ) {

	const { attributes: { postID, showImage, showAuthor, showCategory }, setAttributes } = props

	return (
		<InspectorControls>

			<PanelBody title={ __( 'Choose a post', 'capitainewp-gut-bases' ) }>
				<SearchPost
					onChange={ postID => setAttributes( { postID } ) }
					postType="posts"
					placeholder={ __( 'Search post', 'capitainewp-gut-bases' ) }
				/>
			</PanelBody>

			{ postID && (

				<PanelBody title={ __( 'Customize', 'capitainewp-gut-bases' ) }>

					<ToggleControl
						label={ __( 'Show Image?', 'capitainewp-gut-bases' ) }
						checked={ showImage }
						onChange={ () => setAttributes( { showImage: ! showImage } ) }
					/>

					<ToggleControl
						label={ __( 'Show Author?', 'capitainewp-gut-bases' ) }
						checked={ showAuthor }
						onChange={ () => setAttributes( { showAuthor: ! showAuthor } ) }
					/>

					<ToggleControl
						label={ __( 'Show Category?', 'capitainewp-gut-bases' ) }
						checked={ showCategory }
						onChange={ () => setAttributes( { showCategory: ! showCategory } ) }
					/>

				</PanelBody>
			) }

		</InspectorControls>
  )
}
