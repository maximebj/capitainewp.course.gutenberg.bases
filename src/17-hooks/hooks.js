import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks"; // Load filters library
import { Fragment } from "@wordpress/element";
import { InspectorControls } from "@wordpress/block-editor";
import { createHigherOrderComponent } from "@wordpress/compose";
import { PanelBody, SelectControl } from "@wordpress/components";

import './style.scss'

const allowedBlocks = [ 'capitainewp/hook' ]; // Pourrait être core/button ou core/image par exemple


/**
 * Ajout d'un nouvel attribut
 */
function addAttributes( settings ) {
  if( typeof settings.attributes !== 'undefined' && allowedBlocks.includes( settings.name ) ){
    settings.attributes = Object.assign( settings.attributes, {
      size: {
        type: 'string',
        default: 'medium',
      }
    });
  }
  return settings;
}


/**
 * Ajout des champs de paramétrage dans l'inspecteur
 */
const withAdvancedControls = createHigherOrderComponent( ( BlockEdit ) => {
  return ( props ) => {

		const { name, attributes, setAttributes, isSelected } = props;
    const { size } = attributes;

		if( ! allowedBlocks.includes( name ) ) {
			return(
				<BlockEdit {...props} />
			)
		}

		// Ajout de la classe
		const className = `has-size-${size}`

		return (
      <Fragment>
        <BlockEdit { ...props } className={ className } />
        { isSelected &&
          <InspectorControls>
            <PanelBody title={ __('Text Size', 'capitainewp-gut-bases') } >
							<SelectControl
								label={ __( 'Size', 'capitainewp-gut-bases' ) }
								value={ size }
								options={ [
									{ label: __( 'Small', 'capitainewp-gut-bases' ), value: 'small' },
									{ label: __( 'Medium', 'capitainewp-gut-bases' ), value: 'medium' },
									{ label: __( 'Large', 'capitainewp-gut-bases' ), value: 'large' },
								] }
								onChange={ ( size ) => { setAttributes( { size } ) } }
    					/>

            </PanelBody>
          </InspectorControls>
        }
      </Fragment>
    );
  };
}, 'withAdvancedControls');

/**
 * Ajout de la classe dans le HTML sauvegardé
 */
function applyExtraClass( extraProps, blockType, attributes ) {
  if( ! allowedBlocks.includes( blockType.name ) ) {
    return extraProps;
  }
  const { size } = attributes;
	extraProps.className+= ` has-size-${size}`
  return extraProps;
}


// Les filtres
addFilter(
  'blocks.registerBlockType',
  'capitainewp/custom-attributes',
  addAttributes
);
addFilter(
  'editor.BlockEdit',
  'capitainewp/custom-advanced-control',
  withAdvancedControls
);
addFilter(
  'blocks.getSaveContent.extraProps',
  'capitainewp/applyExtraClass',
  applyExtraClass
);
