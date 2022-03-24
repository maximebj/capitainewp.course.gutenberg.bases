import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

import './hooks';

import Edit from './edit';
import save from './save';

registerBlockType('capitainewp/hook', {
	edit: Edit,
	save,
});
