import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks"; // Load filters library
import { Fragment } from "@wordpress/element";
import { InspectorControls } from "@wordpress/block-editor";
import { createHigherOrderComponent } from "@wordpress/compose";
import { PanelBody, SelectControl } from "@wordpress/components";

import './style.scss'

// Use hook only on Button block
const allowedBlocks = [ 'core/button' ];

/**
 * Add custom attribute for mobile visibility.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
function addAttributes( settings ) {
  /**
   * Check if object exists for old Gutenberg version compatibility
   * Add allowedBlocks restriction
   */
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
 * Add mobile visibility controls on Advanced Block Panel.
 *
 * @param {function} BlockEdit    Block edit component.
 *
 * @return {function} BlockEdit   Modified block edit component.
 */
const withAdvancedControls = createHigherOrderComponent( ( BlockEdit ) => {
  return ( props ) => {
    const { name, attributes, setAttributes, isSelected } = props;
    const { size } = attributes;

		props.className+= ` has-size-${size}` // force class

		return (
      <Fragment>
        <BlockEdit {...props} />
        { isSelected && allowedBlocks.includes( name ) &&
          <InspectorControls>
            <PanelBody title={ __('Button Size', 'capitainewp-gut-bases') } >
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
 * Add custom element class in save element.
 *
 * @param {Object} extraProps     Block element.
 * @param {Object} blockType      Blocks object.
 * @param {Object} attributes     Blocks attributes.
 *
 * @return {Object} extraProps    Modified block element.
 */
function applyExtraClass( extraProps, blockType, attributes ) {
  if( ! allowedBlocks.includes( blockType.name ) ) {
    return extraProps;
  }
  const { size } = attributes;
	extraProps.className+= ` has-size-${size}`
  return extraProps;
}


// Filters

addFilter(
  'blocks.registerBlockType',
  'unow/custom-attributes',
  addAttributes
);
addFilter(
  'editor.BlockEdit',
  'unow/custom-advanced-control',
  withAdvancedControls
);
addFilter(
  'blocks.getSaveContent.extraProps',
  'unow/applyExtraClass',
  applyExtraClass
);
