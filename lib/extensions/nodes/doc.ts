import { NodeExtension } from '../../extension';

export default class Doc extends NodeExtension {
  name = 'doc';
  schema = { content: 'block+' };
}
