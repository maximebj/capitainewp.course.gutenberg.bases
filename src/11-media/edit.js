import { __ } from '@wordpress/i18n'
import { useBlockProps, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor'
import { Placeholder, Button } from '@wordpress/components'

import './editor.scss'

export default function Edit( props ) {
	const blockProps = useBlockProps()

	// Attribution des informations de l'image
	const onSelectImage = picture => {

		console.log(picture) // Afficher les informations récupérées de l'image
		//console.log(picture.sizes) // Afficher les tailles d'image disponible pour ajuster les attributs plus bas si nécessaire

		props.setAttributes( {
			pictureID: picture.id,
			pictureURL: picture.sizes.full.url,
			pictureAlt: picture.alt,
		})
	}

	// Effacement des données de l'image
	const onRemoveImage = () => {
		props.setAttributes({
			pictureID: null,
			pictureURL: null,
			pictureAlt: null,
		})
	}

	return (
		<div { ...blockProps }>
			{ ! props.attributes.pictureID ? (
				<MediaUploadCheck>
					<MediaUpload
						onSelect={ onSelectImage }
						allowedTypes={ [ 'image' ] }
						value={ props.attributes.pictureID }
						render={ ( { open } ) => (
							<Placeholder
								icon="images-alt"
								label={ __( 'Photo', 'capitainewp-gut-bases' ) }
								instructions={ __( 'Select a picture', 'capitainewp-gut-bases' ) }
							>
								<Button
									//isSecondary deprecated : https://github.com/WordPress/gutenberg/issues/2587
									isLarge
									onClick={ open }
									icon="upload"
								>
									{ __( 'Import', 'capitainewp-gut-bases' ) }
								</Button>
							</Placeholder>
						) }
					/>
				</MediaUploadCheck>

			) : (

				<p className="capitaine-image-wrapper">
					<img
						src={ props.attributes.pictureURL }
						alt={ props.attributes.pictureAlt }
					/>

					{ props.isSelected && (

						<Button
							className="capitaine-remove-image"
							onClick={ onRemoveImage }
							icon="dismiss"
						>
							{ __( 'Remove picture', 'capitainewp-gut-bases' ) }
						</Button>

					) }
				</p>
			) }
		</div>

	)
}
