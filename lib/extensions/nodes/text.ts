import { NodeExtension } from '../../extension';

/**
 * 文字
 */
export default class Text extends NodeExtension {
  name = 'text';
  schema = { group: 'inline' };
}
