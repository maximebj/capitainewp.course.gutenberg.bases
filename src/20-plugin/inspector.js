import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'

import SearchPlugin from '../components/searchplugin'

export default function Inspector( props ) {

	const { setAttributes } = props

	return (
		<InspectorControls>
			<PanelBody title="Sélection de l’extension">

				<SearchPlugin
					onChange={ plugin => setAttributes( { slug: plugin.slug } ) }
				/>
			</PanelBody>
		</InspectorControls>
	)
}
