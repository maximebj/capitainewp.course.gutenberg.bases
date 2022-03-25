import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks"; // Load filters library
import { Fragment } from "@wordpress/element";
import { InspectorControls } from "@wordpress/block-editor";
import { createHigherOrderComponent } from "@wordpress/compose";
import { PanelBody, SelectControl } from "@wordpress/components";

import './style.scss'

// Blocs qui vont subir la modification du hook
const allowedBlocks = [ 'capitainewp/hook' ]; // Pourrait être core/button ou core/image par exemple


// 1. Ajout d'un nouvel attribut dans le bloc
function addAttributes( settings, name ) {

	// Ne rien faire si ce n'est pas notre bloc
	if ( ! allowedBlocks.includes( name ) ) {
		return settings;
	}

	// Ajout de l'attribut et de sa valeur par défaut
	settings.attributes = Object.assign( settings.attributes, {
		size: {
			type: 'string',
			default: 'medium',
		}
	});

	return settings;
}


// 2. Ajout des champs de paramétrage dans l'inspecteur
const addAdvancedControls = createHigherOrderComponent( ( Block ) => {
  return ( props ) => {

		const { name, attributes, setAttributes, isSelected } = props;
    const { size } = attributes;

		// Si ce n'est pas le bon bloc, on quitte
		if( ! allowedBlocks.includes( name ) ) {
			return(
				<Block {...props} />
			)
		}

		// Ajout de l'élément dans l'inspecteur
		return (
      <Fragment>
        <Block { ...props } />
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
}, 'addAdvancedControls');


// 3. Ajout de la classe dans le bloc dans l'éditeur
const addCustomClassToBlock = createHigherOrderComponent( ( Block ) => {
  return ( props ) => {

		const { name } = props;
    const { size } = props.attributes;

		// Si ce n'est pas le bon bloc, on quitte
		if( ! allowedBlocks.includes( name ) ) {
			return(
				<Block {...props} />
			)
		}

		// Ajout de la classe
		const className = `has-size-${size}`

		// Ajout de l'élément dans l'inspecteur
		return (
			<Block { ...props } className={className} />
    );
  };
}, 'addAdvancedControls');


// 4. Ajout de la classe dans le HTML sauvegardé
function applyExtraClass( extraProps, blockType, attributes ) {
  if( ! allowedBlocks.includes( blockType.name ) ) {
    return extraProps;
  }
  const { size } = attributes;
	extraProps.className+= ` has-size-${size}`
  return extraProps;
}


// Déclaration des filtres
addFilter(
  'blocks.registerBlockType',
  'capitainewp/custom-attributes',
  addAttributes
);
addFilter(
  'editor.BlockEdit',
  'capitainewp/custom-advanced-control',
  addAdvancedControls
);
addFilter(
  'editor.BlockListBlock',
  'capitainewp/custom-block-class',
  addCustomClassToBlock
);
addFilter(
  'blocks.getSaveContent.extraProps',
  'capitainewp/applyExtraClass',
  applyExtraClass
);
