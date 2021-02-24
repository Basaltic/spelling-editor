import { NodeExtension } from "../../extension";

/**
 * 文档
 */
export default class Doc extends NodeExtension {
  name = "doc";
  get schema() {
    return { content: "block+" };
  }
}
