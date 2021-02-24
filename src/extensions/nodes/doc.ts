import { NodeExtension } from "../../extension";

export default class Doc extends NodeExtension {
  name = "doc";
  get schema() {
    return { content: "block+" };
  }
}
