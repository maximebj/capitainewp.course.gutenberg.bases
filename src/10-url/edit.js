import { __ } from '@wordpress/i18n'
import { useBlockProps, URLInput } from '@wordpress/block-editor'
import { TextControl } from '@wordpress/components'
import { Fragment } from '@wordpress/element'

import './editor.scss'

export default function Edit( props ) {
	const blockProps = useBlockProps()

	return (
		<div { ...blockProps }>
			{ props.isSelected ? (

				<Fragment>
					<TextControl
						placeholder={ __( 'Link Label', 'capitainewp-gut-bases' ) }
						value={ props.attributes.text }
						onChange={ text => props.setAttributes( { text } ) }
					/>

					<URLInput
						__nextHasNoMarginBottom //get rid of deprecation warning see : https://make.wordpress.org/core/2023/03/03/editor-components-updates-in-wordpress-6-2/
						value={ props.attributes.url }
						onChange={ (url, post) => props.setAttributes( { url, text: (post && post.title) || props.attributes.text  } ) }
					/>
				</Fragment>
				) : (
					<p>
						<a href={ props.attributes.url }>
							{ props.attributes.text || __( 'Edit link',  'capitainewp-gut-bases' ) }
						</a>
					</p>
				)
			}
		</div>
	)
}
